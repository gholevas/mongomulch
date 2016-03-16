app.directive('sidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/sidebar.html',
        controller: 'SideBarCtrl'
    };
});

var storage = require('electron-json-storage');


app.controller("SideBarCtrl", function($scope) {
    $scope.schemas = ['Users'];
    $scope.schemaName = '';

    // storage.keys(function(error, keys) {
    //     if (error) throw error;

    //     console.log(keys)
    // });

    // storage.get('schemas2', function(error, data) {
    //     if (error) throw error;

    //     console.log(data);
    // });
    // console.log()
    $scope.addSchema = function() {
        // storage.get('schemas', function(error, data) {
        //     if (error) throw error;
        //     console.log(data);
        // });
        // storage.set('schemas2', [{ name: $scope.schemaName }], function(error) {
        //     if (error) throw error;
        // })
        $scope.schemas.push($scope.schemaName);
        $scope.schemaName = '';
    }

});
