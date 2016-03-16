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

    $scope.addSchema = function() {
    	// storage.set('schemas',{name: $scope.schemaName},function(error){
    	// 	if(error) throw error;
    	// })
        $scope.schemas.push($scope.schemaName);
        $scope.schemaName = '';
    }

});
