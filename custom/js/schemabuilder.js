app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	setUIthings();

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
});

function setUIthings(){
	$('#schemaTable').editableTableWidget().numericInputExample().find('td:first').focus();
}