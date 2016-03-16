app.directive('sidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/sidebar.html',
        controller: 'SideBarCtrl'
    };
});


app.controller("SideBarCtrl", function($scope) {
    $scope.schemas = ['Users'];
    $scope.schemaName = '';

    $scope.addSchema = function() {

        $scope.schemas.push($scope.schemaName);
        $scope.schemaName = '';
    }

});
