
app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'app/home/home.html',
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
				var modalSvc = this;
				Storage.loadConfStore(dir)
				.then(function(result){
					SchemaFactory.initialize();
					$state.go('visualizer',{},{reload: true});
					$rootScope.$broadcast('newSchema');
				}).catch(function(errObj){
					swal({
						title: errObj.title,
						text: errObj.text,
						type: errObj.type,
						confirmButtonColor: "#DD6B55"
					}, function(isConfirm){
						if(!Storage.isProjLoaded())
							modalSvc.open(false);
					});
				});

			},
			new: function(projName, dirName, onlyNew){
				var modalSvc = this;
				Storage.newConfStore(projName, dirName)
				.then(function(result){
			      	SchemaFactory.initialize();
			      	$state.go('visualizer',{},{reload: true});
			      	$rootScope.$broadcast('newSchema');
				}).catch(function(errObj){
					swal({
						title: errObj.title,
						text: errObj.text,
						type: errObj.type,
						confirmButtonColor: "#DD6B55"
					}, function(isConfirm){
						modalSvc.open(onlyNew);
					});
				});
			},
			open: function(onlyNew){
			    var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'app/home/newprojmodal.html',
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
			      	this.new(result.projName, result.dirName, result.onlyNew);
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
			$uibModalInstance.close({action:"new", projName: projName, dirName: dirName, onlyNew: onlyNew});
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








