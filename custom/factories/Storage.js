const Configstore = require('configstore');
const path = require('path');
var storageAppKey = require(path.join(__dirname, './env')).storageAppKey;
const conf = new Configstore(storageAppKey);

// //=> true

// // use dot notation to access nested properties (provided by `dot-prop` module)
// conf.set('bar.baz', true);

// console.log(conf.all);
// //=> { foo: 'bar', awesome: true, bar: { baz: true } }

// conf.del('awesome');

// console.log(conf.get('awesome'));
// //=> undefined


app.factory('Storage', function($rootScope) {
    
    return {
    	set: function(key, value){
    		conf.del(key);
    		conf.set(key, value);
    	},
    	get: function(key){
    		return conf.get(key);
    	},
    	del: function(key){
    		return conf.del(key);
    	},
    	all: function(){
    		return conf.all;
    	}
    };

});