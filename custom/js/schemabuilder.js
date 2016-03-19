app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	
	/////////INITIALIZE/////////
	// setTableEditable();
	resetNewFieldVals($scope);
	$scope.typeArr = ['String', 'Number', 'Boolean','Buffer'];
	refreshSchema();
	$scope.schemaLoaded = $scope.schema ? true : false;
	$scope.editingField = null;
	/////////INITIALIZE/////////

	$scope.addSchema = (schemaName) => {
		SchemaFactory.addSchema(schemaName);
	}

	//receives newSchema event from SchemaFactory.addSchema
	$scope.$on('newSchema', function(event, args){
		$state.go('schemabuilder', {schemaId: args})
	});
	//receives newField event from SchemaFactory.addNewField
	$scope.$on('newField', function(event, args){
		refreshSchema();
	});

	$scope.addRow = () => {
		$scope.schema.addField($scope.newFieldName,	$scope.newFieldType, $scope.newFieldOptionsObj);
		resetNewFieldVals($scope);
	};

	$scope.selectType = (type,field) => {
		if(!field) $scope.newFieldType = type;
		//else field.updateType
	};


	$scope.selectArrType = (type,field) => {
		console.log('click');
		console.log($scope.newFieldType);
		if(!field) $scope.newFieldType = "Array of "+ type;
		//else field.updateType
	};

	$scope.selectObjType = (type,field) => {
		console.log('click');
		console.log($scope.newFieldType);
		if(!field) $scope.newFieldType = "Referenceing "+ type;
		//else field.updateType
	};


	$scope.selectOption =(name, value, field) => {
		if(!field) $scope.newFieldOptionsObj[name] = value;
		// else get fields optionsarr...
		$scope.newFieldOptionsDisplay = Object.keys($scope.newFieldOptionsObj).reduce((prev, key) => {return prev==""?key:prev+", "+key; },"");
	}


	$scope.editField =(field) => {
		if($scope.editingField) $scope.editingField = null;
		else $scope.editingField = field;

	}

	function refreshSchema(){
		$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);
	}

	function resetNewFieldVals(){
		$scope.newFieldOptionsDisplay ='';
		$scope.newFieldOptionsObj = {};
		$scope.newFieldType ='Pick Data Type';
		$scope.newOptionValue = '';
		$scope.newOptionName = '';
		$scope.newFieldName = '';
	}

});


function setTableEditable(){
	$('#schemaTable').editableTableWidget().numericInputExample().find('td:first').focus();
}