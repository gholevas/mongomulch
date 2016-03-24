// app.factory('MongoFactory', function($rootScope) {

//     var MongoClient = require('mongodb').MongoClient;

//     return {
//         getCollections: function() {
//              return MongoClient.connect('mongodb://localhost:27017/stackstore', function(err, db) {
//                 console.log(db.collections())
//                 db.collections()
//                     .then(function(collections) {
//                         console.log(collections)
//                         return collections;
//                         // db.close();
//                     });
//             });
//         }
//     };

// });
