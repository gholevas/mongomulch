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
    	console.log($scope.currentDB)
        MongoClient.connect(url + db, function(err, db) {
            db.collections()
                .then(function(collections) {
                    $scope.collections = collections;
                    $scope.$digest()
                    console.log('collections', $scope.collections)
                });
        });
    }


});
