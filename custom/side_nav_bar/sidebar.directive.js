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
        var thisWindow = require('electron').remote.getCurrentWindow();
        dialog.showOpenDialog(thisWindow, { properties: ['openDirectory'] }, function(dirNamesArr) {
            if (dirNamesArr === undefined) return;
            var dirName = dirNamesArr[0];
            SchemaFactory.exportSchemas(dirName)
            .then(function(result){
                swal({
                    title: result.title, 
                    text: result.text, 
                    type: result.type, 
                    allowEscapeKey: true, 
                    allowOutsideClick: true,
                    showCancelButton: true,
                    confirmButtonText: "Open Directory?"
                }, function(isConfirm){
                    if(isConfirm)
                        Storage.openDir(dirName);
                });
            }).catch(function(errObj){
                swal({title: errObj.title, text: errObj.text, type: errObj.type});
            })
        });

    }


    $scope.addSchema = function() {
        $('#newSchemaModal').modal('hide');
        var sanitzedSchemaName = camelize($scope.newSchemaName).capitalizeFirstLetter();
        var newSchema = SchemaFactory.addSchema(sanitzedSchemaName);

        $state.go("schemabuilder", { schemaId: newSchema.id })
            // reloadSchemas();
    }


    $scope.openDir = function() {
        Storage.openDir();
    }

    $scope.save = function() {
        Storage.saveFile()
        .then(function(result){
            swal({   
                title: result.title,
                text: result.text,
                type: result.type,
                timer: 2000,
                showConfirmButton: false
            });
        }).catch(function(error){
            swal({
                title: error.title,
                text: error.text,
                type: error.type,
                timer: 2000,
                showConfirmButton: false
            });
        })
    }
    $scope.load = function() {
        var remote = require('remote');
        var dialog = remote.require('dialog');
        var thisWindow = require('electron').remote.getCurrentWindow();
        dialog.showOpenDialog(thisWindow, { properties: ['openDirectory'] }, function(dirNamesArr) {
            if (dirNamesArr === undefined) return;
            var dirName = dirNamesArr[0];
            ModalSvc.load(dirName);
        });
    }
    $scope.new = function() {
        ModalSvc.open(true);
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