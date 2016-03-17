app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	setUIthings();


	//will return default if schemaId is null
	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	$scope.$on('newSchema', function(event, args){
		$state.go('schemabuilder', {schemaId: args})
	})
});

function setUIthings(){
	$('#schemaTable').editableTableWidget().numericInputExample().find('td:first').focus();
}