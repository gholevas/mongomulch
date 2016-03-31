app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'custom/home/home.html',
        controller: 'HomeCtrl'
    })
});

app.controller("HomeCtrl", function($scope, $rootScope, $state, Storage, SchemaFactory, $uibModal, ModalSvc) {
	if(!Storage.isProjLoaded()){
		ModalSvc.open();
	} else {
		$state.go('visualizer',{},{reload: true})
	}
});

app.service('ModalSvc', function($rootScope, $state, Storage, SchemaFactory, $uibModal) {

		return {

			load: function(dir){

				Storage.loadConfStore(dir);
				SchemaFactory.initialize();
				$state.go('visualizer',{},{reload: true});
				$rootScope.$broadcast('newSchema');

			},
			new: function(projName, dirName){
				Storage.newConfStore(projName, dirName);
		      	SchemaFactory.initialize();
		      	$state.go('visualizer',{},{reload: true});
		      	$rootScope.$broadcast('newSchema');
			},
			open: function(onlyNew){
			    var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'custom/home/newprojmodal.html',
			      controller: 'ModalInstanceCtrl',
			      size: 'lg',
			      backdrop: 'static',
			      keyboard  : false
			      ,resolve: {
			        onlyNew: function () {
			          return onlyNew;
			        }
			      }
			    });

			    modalInstance.result.then((result) => {
			      if(result.action=="load"){
					this.load(result.dir);
			      } 
			      if(result.action=="new"){
			      	this.new(result.projName, result.dirName);
			      } 
			    }, (errMsg) => {
			      console.log('Modal dismissed at: ' + new Date(), " ", errMsg);
			    });
			}

		}

});

app.controller("ModalInstanceCtrl", function($scope, $uibModalInstance, Storage, $state, onlyNew) {
	
	$scope.makingNewProj = false;
	$scope.onlyNew = onlyNew;

	$scope.newProject = function (projName) {
		var remote = require('remote');
        var dialog = remote.require('dialog');
        var thisWindow = require('electron').remote.getCurrentWindow();
        dialog.showOpenDialog(thisWindow, { properties: ['openDirectory', 'createDirectory'] }, function(dirNamesArr) {
			$scope.makingNewProj = false;
	        if (dirNamesArr === undefined) return;
	        var dirName = dirNamesArr[0];
			$uibModalInstance.close({action:"new", projName: projName, dirName: dirName});
        });
	};

	$scope.loadProject = function () {
		var remote = require('remote');
        var dialog = remote.require('dialog');
        var thisWindow = require('electron').remote.getCurrentWindow();
        dialog.showOpenDialog(thisWindow, { properties: ['openDirectory'] }, function(dirNamesArr) {
	        if (dirNamesArr === undefined) return;
	        var dirName = dirNamesArr[0];
	        $uibModalInstance.close({action:"load", dir: dirName});
        });
	};

	$scope.closeModal = () => {
		$uibModalInstance.dismiss();
	}

});








