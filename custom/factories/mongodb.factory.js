app.factory('MongoFactory', function($rootScope) {

    var MongoClient = require('mongodb').MongoClient,
        test = require('assert');
    var connectMongo = function() {
        var MongoClient = require('mongodb').MongoClient,
            test = require('assert');
        MongoClient.connect('mongodb://localhost:27017/stackstore', function(err, db) {
            // Create the collection
            // var collection = db.collection('test_correctly_access_collections2_with_promise');
            // Retry to get the collection, should work as it's now created
            db.collections().then(function(collections) {
                test.ok(collections.length > 0);
                console.log(collections)
                db.close();
            });
        });
    }

    return {
        connect: function() {
            return connectMongo();
        }
    };

});
