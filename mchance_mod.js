var Chance = require('chance'),
	_ = require('lodash'),
	Types = require('mongoose').Schema.Types,
	Promise = require('bluebird');

// db should be a mongoose database connection object
module.exports = function (db, customSeed) {
	// cached return value
	if (db.mchance) return db.mchance;
	
	var mchance = db.mchance = Chance(customSeed);

	mchance.title = function (options) {
		options = options || {};
		var n = options.words || this.natural({min: 1, max: 6});
		var words = this.n(this.word, n);
		var mchance = this;
		return words.reduce(function (title, word) {
			return title + mchance.capitalize(word) + ' '
		}, '').slice(0, -1);
	};

	// generates an array path, using `seedn` to determine the number of elements
	// mchance.path calls this function for arrays
	// and this function calls mchance.path for each array element
	function genArrayPath (pathObj, dbCache) {
		var seedn = pathObj.options.seedn || 1;
		if (typeof seedn == 'function') seedn = seedn.call(mchance);
		var innerSeed = mchance.path.bind(mchance, pathObj.caster, dbCache);
		return mchance.n(innerSeed, seedn).filter(function (elem) {
			// console.log('elem', elem);
			return elem !== undefined;
		});
	}

	// generates based on a mongoose path object
	// and optionally a database cache (for refs)
	mchance.path = function (pathObj, dbCache) {
		// console.log("path", pathObj);
		var seedProb = pathObj.options.seedProb;
		if (seedProb) {
			var prob = (typeof seedProb == 'function' ? seedProb() : seedProb);
			if (prob > Math.random()) return;
		}
		var type = pathObj.options.type || pathObj.instance;
		// if (pathObj.path === 'arrayOf_') {
		// 	// console.log('type', type);
		// 	// console.log('db cache', dbCache);
		// }
		// console.log("pathOptions", type)
		if (_.isArray(type)) return genArrayPath(pathObj, dbCache);
		else if ((type === Types.ObjectId || type === 'ObjectID') &&  dbCache) {
			var ref = pathObj.options.ref;
			// console.log('ref', ref);
			return this.pick(dbCache[ref])._id;
		} else {
			var seed = pathObj.options.seed;
			return (typeof seed == 'function' ? seed.call(this) : seed);
		}
	};

	// fills a document's paths by generating each path's data
	// fills refs using database cache (if provided)
	mchance.fillPaths = function (doc, dbCache) {
		var mchance = this;
		var paths = _.omit(doc.schema.paths, ['_id', '__v']);
		_.forOwn(paths, function (pathObj, k) {
			var value = mchance.path(pathObj, dbCache);
			if (value) doc.set(k, value);
		});
		return doc;
	};

	// generates a mongoose document
	// fills refs using database cache (if provided)
	mchance.document = function (ref, dbCache) {
		var doc = new db.model(ref);
		return this.fillPaths(doc, dbCache);
	};

	// generate n empty docs of model given by ref
	function nEmptyDocs (n, ref) {
		var model = db.model(ref);
		n = (typeof n == 'function' ? n.call(mchance) : n);
		return _.times(n, function () {
			return new model();
		});
	}

	// generates a cache of documents where each key is a ref
	// and each value is generated documents
	// fills refs using itself
	// specifications should be an object where each key is a ref
	// and each value is a number or a function that returns a number
	mchance.dbCache = function (specifications) {
		// console.log("dbCache ",specifications);
		var mchance = this;
		return _.chain(specifications)
		.mapValues(nEmptyDocs)
		.mapValues(function (docs, ref, dbCache) {
			return docs.map(function (doc) {
				return mchance.fillPaths(doc, dbCache);
			});
		})
		.value();
	};

	// drops the database
	// returns a promise
	function drop () {
		return new Promise(function (resolve, reject) {
			db.on('open', function () {
				db.db.dropDatabase(function (err) {
					if (err) reject(err);
					else resolve();
				});
			});
		});
	}

	// will attempt to save
	// a failure will result in a re-try until numRetries reaches 0
	function trySave (doc, dbCache, numRetries) {
		return doc.save()
		.then(null, function (err) {
			console.error('Error while saving', err);
			if (numRetries > 0) {
				console.error('...trying again with different data...');
				mchance.fillPaths(doc, dbCache);
				return trySave(doc, dbCache, numRetries - 1);
			} else {
				console.error('...no more retries, moving on...');
			}
		});
	}

	// generates a *saved* database
	// specifications should be an object where each key is a ref
	// and each value is a number or a function that returns a number
	db.seed = function (specifications, options) {
		console.log("OMRIIIIII Y U DO DIS");
		// console.log("seed ",specifications, options);
		options = options || {};
		var dbCache = mchance.dbCache(specifications);
		function eachDoc (doc) {
			return trySave(doc, dbCache, options.retries || 1);
		}
		return drop()
		.then(function () {
			return _.mapValues(dbCache, function (docs, ref) {
				return Promise.map(docs, eachDoc);
			});
		})
		.then(Promise.props);
	};

	return mchance;
};