var remote = require('remote');
var dialog = remote.require('dialog');

app.directive('sidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/side_nav_bar/sidebar.html',
        controller: 'SideBarCtrl'
    };
});


app.controller("SideBarCtrl", function($scope, $rootScope, SchemaFactory, Storage, $state, $mdToast) {

       
        // $scope.showSimpleToast = function() {
        //     console.log('hi')
        //     $mdToast.show(
        //         $mdToast.simple()
        //         .textContent('Simple Toast!')
        //         .position('bottom right')
        //         .hideDelay(3000)
        //     );
        // };

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

    $scope.exportSchemas = () => {
        var remote = require('remote');
        var dialog = remote.require('dialog');

        dialog.showOpenDialog({ properties: ['openDirectory'] }, function(dirNamesArr) {
            if (dirNamesArr === undefined) return;
            var dirName = dirNamesArr[0];

            SchemaFactory.exportSchemas(dirName);
        });

    }

    $scope.save = function() {
        Storage.saveFile();
    }
    $scope.load = function() {
        Storage.unload_YO_DELETETHISMETHOD();
        $state.go('home')
    }

    $scope.addSchema = function() {
        var sanitzedSchemaName = camelize($scope.newSchemaName).capitalizeFirstLetter();
        var newSchema = SchemaFactory.addSchema(sanitzedSchemaName);
        console.log('the newSchme is', newSchema);
        $state.go("schemabuilder", newSchema.id)
            // reloadSchemas();
    }

    $scope.save = function() {
        Storage.saveFile();
    }
    $scope.load = function() {
        Storage.unload_YO_DELETETHISMETHOD();
        $state.go('home')
    }



    $scope.addSchema = function() {
        if ($scope.newSchemaName !== '') {
            var sanitzedSchemaName = camelize($scope.newSchemaName).capitalizeFirstLetter();
            SchemaFactory.addSchema(sanitzedSchemaName);
            reloadSchemas();
        }
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
        //////////admin-ish////////////


    $scope.$on('newSchema', reloadSchemas);
    reloadSchemas();



    $scope.$on('newSchema', reloadSchemas);
    reloadSchemas();
})
