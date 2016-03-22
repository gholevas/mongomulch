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

    // storage.keys(function(error, keys) {
    //     if (error) throw error;

    //     console.log(keys)
    // });
    $scope.exportSchemas = () =>{

        SchemaFactory.exportSchemas();
    }

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
        // storage.set('schemas2', [{ name: $scope.newSchemaName }], function(error) {
        //     if (error) throw error;
        // })
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
        //console.log(Storage.all());
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