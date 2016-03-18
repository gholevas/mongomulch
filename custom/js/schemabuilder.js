app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	// setUIthings();
	$scope.newFieldOptionsDisplay ='Pick Options';
	var newFieldOptionsArr = [];
	$scope.newFieldType ='Pick Data Type';

	if($stateParams.schemaId)
		$scope.schemaLoaded = true;
	else
		$scope.schemaLoaded = false;

	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	$scope.addSchema = (schemaName) => {
		SchemaFactory.addSchema(schemaName);
	}

	$scope.$on('newSchema', function(event, args){
		$state.go('schemabuilder', {schemaId: args})
	});

	$scope.$on('newField', function(event, args){
		$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);
	});

	$scope.optionsModel =[];

	$scope.addRow = () => {
		console.log("printing options");
		console.log($scope.optionsModel);
		SchemaFactory.addNewField($stateParams.schemaId, $scope.newFieldName,$scope.newFieldType,$scope.newFieldOptions);
		$scope.newFieldName ='';
		$scope.newFieldOptionsDisplay ='Pick Options';
		$scope.newFieldType ='Pick Data Type';

	};

	$scope.typeArr = ['String', 'Number', 'Boolean','Buffer', 'Object','Refrence', 'Array'];

	$scope.selectedType =(type,field) => {
		if(!field) $scope.newFieldType = type;
	};

	$scope.selectedOptions =(key, val, field) => {
		if(!field) newFieldOptionsArr.push({key: key, value: value});
		// else get fields optionsarr...
		$scope.newFieldOptionsDisplay = Object.keys(newFieldOptionsArr);
	}


});

function setUIthings(){
	$('#schemaTable').editableTableWidget().numericInputExample().find('td:first').focus();
}