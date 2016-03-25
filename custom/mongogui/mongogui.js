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

    MongoClient.connect(url, function(err, db) {
        var adminDb = db.admin();
        adminDb.listDatabases(function(err, dbs) {
            console.log(dbs.databases)
            $scope.dbs = dbs.databases;
            $scope.$digest();
        });
    });

    $scope.showCollections = function(db) {
    	$scope.currentDB = db;
    	$scope.currentCollection = null;
    	console.log($scope.currentDB)
        MongoClient.connect(url + db, function(err, db) {
            db.collections()
                .then(function(collections) {
                    $scope.collections = collections;
                    $scope.$digest();
                    console.log('collections', $scope.collections)
                });
        });
    }

    $scope.showDocuments = function(collection){
    	$scope.currentCollection = collection;
    	$scope.currentDoc = null;
    	$scope.currentCollectionName = collection.collectionName;
    	 MongoClient.connect(url + $scope.currentDB, function(err, db) {
            db.collection(collection.collectionName).find().toArray(function(err,docs){
            	if(err)console.log(err)
            	docs.forEach(function(doc){
            		doc.numFields = Object.keys(doc).length;
            	})
            	$scope.docs = docs;
           	    $scope.$digest();
            	console.log(docs);
            })
        });
    }

    $scope.showDoc = function(doc){
    	$scope.currentDoc = doc;
    }


});
