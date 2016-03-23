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

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    $scope.exportSchemas = (path) => {

        SchemaFactory.exportSchemas(path);
    }

    $scope.addSchema = function() {
        var sanitzedSchemaName = camelize($scope.newSchemaName).capitalizeFirstLetter();
        SchemaFactory.addSchema(sanitzedSchemaName);
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
