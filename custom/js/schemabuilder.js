app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	// setUIthings();

	console.log("onreload", $stateParams.schemaId);
	if($stateParams.schemaId)
		$scope.schemaLoaded = true;
	else
		$scope.schemaLoaded = false;

	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	$scope.addSchema = (schemaName) => {
		SchemaFactory.addSchema(schemaName);
        //function to 
	}

	$scope.$on('newSchema', function(event, args){
		$state.go('schemabuilder', {schemaId: args})
	});

	$scope.$on('newField', function(event, args){
		$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);
	});

	$scope.dummy = function(){
		console.log("akak");
	}


	$scope.addRow = () => {
		SchemaFactory.addNewField($stateParams.schemaId, $scope.newFieldName,$scope.newFieldType,$scope.newFieldOptions);
		$scope.newFieldName ='';
		$scope.newFieldType ='';
		$scope.newFieldType ='';

	};
});

function setUIthings(){
	$('#schemaTable').editableTableWidget().numericInputExample().find('td:first').focus();
}