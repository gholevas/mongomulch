app.directive('sidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/side_nav_bar/sidebar.html',
        controller: 'SideBarCtrl'
    };
});

app.controller("SideBarCtrl", function($scope, $rootScope, SchemaFactory, Storage) {
    var reloadSchemas = function() {
        $scope.schemas = SchemaFactory.getSchemas();
        $scope.newSchemaName = '';
    }

    $scope.exportSchemas = () =>{
        SchemaFactory.exportSchemas();
    }

    $scope.addSchema = function() {
        SchemaFactory.addSchema($scope.newSchemaName);
        reloadSchemas();
    }

    $scope.deleteSchema = function(schema) {
        SchemaFactory.deleteSchema(schema);
        reloadSchemas();
    }

    //////////admin-ish////////////
    $scope.deleteAll = function() {
        SchemaFactory.deleteAll();
        reloadSchemas();
    }
    $scope.showStorage = function() {
        console.log(Storage.all());
    }
    //////////admin-ish////////////

    $scope.$on('newSchema', reloadSchemas);
    reloadSchemas();
});

app.directive('sidebarSchemaButton', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/side_nav_bar/sidebar_schemabutton.directive.html'
    };
});