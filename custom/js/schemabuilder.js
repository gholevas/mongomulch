app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/templates/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	console.dir($stateParams.schemaId);
	$('#mainTable').editableTableWidget().numericInputExample().find('td:first').focus();

	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);
	console.log($scope.schema);
	$scope.$on('newSchema', function(event, args){
		console.log(args);
		$state.go('schemabuilder', {schemaId: args})
	})
});