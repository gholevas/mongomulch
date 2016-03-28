var mongoose = require('mongoose');
var seeder = require('mongoose-seeder');

app.factory('SeedFactory', function(SchemaFactory) {

	var connect = function(connectionString){
		return mongoose.connect(connectionString).connection;
	}

	var registerModels = function(){
		var schemas = SchemaFactory.getSchemas();
		schemas.map(schema => generate_schema(schema))
		.forEach(schemaCode => eval(schemaCode));

		return;
	}

    return {
    	seed: function(connectionString, seedJSON){
    		var seedObj = JSON.parse(seedJSON);
    		console.log("seeding ", seedObj);

    		console.log('connecting to ', connectionString);
    		var db = connect(connectionString);

    		var startDbPromise = new Promise(function (resolve, reject) {
    			db.on('open', resolve);
    			db.on('error', reject);
			});

			startDbPromise.then(function () {
    			console.log('MongoDB connection opened!');
    			return registerModels();
			}).then(function(registerResult){
				console.log("registred", registerResult);
				return seeder.seed(seedObj, {dropCollections: true, dropDatabase: false});
			}).then(function(dbData){
            	console.log("seeding successful, check DB ", dbData);
            	console.log(mongoose.models)
            	mongoose.models = {};
            	mongoose.modelSchemas = {};
            	console.log(mongoose.models)
            	mongoose.disconnect();
        	}).catch(function(err) {
    			console.log("ERR: ", err);
    			console.log(mongoose.models)
            	mongoose.models = {};
            	mongoose.modelSchemas = {};
            	console.log(mongoose.models)
    			mongoose.disconnect();
			});

    	}
    };

});


// var Promise = require('bluebird');
// "mongodb://localhost:27017/SeederTest";