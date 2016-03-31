app.config(function($stateProvider) {
    $stateProvider.state('mongogui', {
        url: '/mongogui',
        templateUrl: 'custom/mongogui/mongogui.html',
        controller: 'MongoGuiCtrl'
    });
});

app.controller("MongoGuiCtrl", function($scope, $stateParams, $state) {
    var url = 'mongodb://localhost:27017/';
    var MongoClient = require('mongodb').MongoClient;
    $scope.currentDB;
    $scope.currentCollection;
    $scope.currentCollectionName;
    $scope.currentDoc;
    $scope.docKey;
    $scope.docValue;
    $scope.docs = [];

    MongoClient.connect(url, function(err, db) {
        var adminDb = db.admin();
        adminDb.listDatabases(function(err, dbs) {
            $scope.dbs = dbs.databases;
            $scope.$digest();
        });
    });

    $scope.showCollections = function(db) {
        $scope.currentDB = db;
        $scope.currentCollection = null;
        MongoClient.connect(url + db, function(err, db) {
            db.collections()
                .then(function(collections) {
                    $scope.collections = collections;
                    $scope.$digest();
                    console.log('collections', $scope.collections)
                });
        });
    }

    $scope.showDocuments = function(collection) {
        $scope.currentCollection = collection;
        $scope.currentDoc = null;
        $scope.docKey = '';
        $scope.docValue = '';
        $scope.currentCollectionName = collection.collectionName;
        MongoClient.connect(url + $scope.currentDB, function(err, db) {
            db.collection(collection.collectionName).find().toArray(function(err, docs) {
                if (err) console.log(err)
                docs.forEach(function(doc) {
                    doc.numFields = Object.keys(doc).length;
                })
                $scope.docs = docs;
                $scope.$digest();
            })
        });
    }



    $scope.searchDocs = function() {
        if($scope.docKey === '' && $scope.docValue === ''){
            $scope.showDocuments($scope.currentCollection);
        }else{
            var currentCollection = $scope.currentCollection.collectionName;
            var theKey = $scope.docKey.toString();
            var val = $scope.docValue.toString();
            var search = {};
            search[theKey] = val;
            $scope.currentDoc = null;
            MongoClient.connect(url + $scope.currentDB, function(err, db) {
                var cursor = db.collection(currentCollection).find(search);
                cursor.toArray(function(err, docs) {
                    if (err) console.log(err)
                    docs.forEach(function(doc) {
                        doc.numFields = Object.keys(doc).length;
                    })
                    $scope.docs = docs;
                    $scope.$digest();
                })
            });
        }
    }

    $scope.showDoc = function(doc) {
        $scope.currentDoc = doc;
    }


});
