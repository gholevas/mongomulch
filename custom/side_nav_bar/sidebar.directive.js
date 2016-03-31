var remote = require('remote');
var dialog = remote.require('dialog');

app.directive('sidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/side_nav_bar/sidebar.html',
        controller: 'SideBarCtrl'
    };
});

app.controller("SideBarCtrl", function($scope, $rootScope, SchemaFactory, Storage, $state, ModalSvc, $mdToast) {


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
            swal("Congrats!", "Your schemas were generated and you just saved a bunch of time.", "success")
        });

    }


    $scope.addSchema = function() {
        $('#newSchemaModal').modal('hide');
        var sanitzedSchemaName = camelize($scope.newSchemaName).capitalizeFirstLetter();
        var newSchema = SchemaFactory.addSchema(sanitzedSchemaName);

        $state.go("schemabuilder", { schemaId: newSchema.id })
            // reloadSchemas();
    }




    $scope.save = function() {
        Storage.saveFile();
    }
    $scope.load = function() {
        var remote = require('remote');
        var dialog = remote.require('dialog');
        dialog.showOpenDialog({ properties: ['openDirectory'] }, function(dirNamesArr) {
            if (dirNamesArr === undefined) return;
            var dirName = dirNamesArr[0];
            // $uibModalInstance.close({action:"load", dir: dirName});
            ModalSvc.load(dirName);
        });
    }
    $scope.new = function() {
        console.log("makingnew")
        ModalSvc.open(true);
        // var remote = require('remote');
        // var dialog = remote.require('dialog');
        // dialog.showOpenDialog({ properties: ['openDirectory'] }, function(dirNamesArr) {
        //     $scope.makingNewProj = false;
        //     if (dirNamesArr === undefined) return;
        //     var dirName = dirNamesArr[0];
        //     // $uibModalInstance.close({action:"new", projName: projName, dirName: dirName});
        //     ModalSvc.new(projName, dirName);
        // });
    }



    $scope.deleteSchema = function(schema) {
        SchemaFactory.deleteSchema(schema);
        reloadSchemas();
    }

    $scope.goToSchema = function(id) {
        $state.go("schemabuilder", {schemaId: id});
    }


    $scope.deleteAll = function() {
            SchemaFactory.deleteAll();
            reloadSchemas();
            $state.go("visualizer")
        }





    $scope.$on('newSchema', reloadSchemas);
    reloadSchemas();
})