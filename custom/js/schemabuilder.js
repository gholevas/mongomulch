app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	// setTableEditable();
	resetNewFieldVals($scope);
	$scope.typeArr = ['String', 'Number', 'Boolean','Buffer', 'Object','Refrence', 'Array'];

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

	$scope.addRow = () => {
		SchemaFactory.addNewField($stateParams.schemaId, $scope.newFieldName,$scope.newFieldType,$scope.newFieldOptionsObj);
		resetNewFieldVals($scope);
	};


	$scope.selectType =(type,field) => {
		if(!field) $scope.newFieldType = type;
	};

	$scope.selectOption =(name, value, field) => {
		if(!field) $scope.newFieldOptionsObj[name] = value;
		// else get fields optionsarr...
		$scope.newFieldOptionsDisplay = Object.keys($scope.newFieldOptionsObj).reduce((prev, key) => {return prev==""?key:prev+", "+key; },"");
	}


});

function resetNewFieldVals(scope){
	scope.newFieldOptionsDisplay ='';
	scope.newFieldOptionsObj = {};
	scope.newFieldType ='Pick Data Type';
	scope.newOptionValue = '';
	scope.newOptionName = '';
	scope.newFieldName = '';
}

function setTableEditable(){
	$('#schemaTable').editableTableWidget().numericInputExample().find('td:first').focus();
}