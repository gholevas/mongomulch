app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/schemabuilder/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {
	console.log(SchemaFactory.getSchemas())

	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);
	//console.log(SchemaFactory.getSchemaById($stateParams.schemaId))

	$scope.addSchema = (schemaName) => {
		SchemaFactory.addSchema(schemaName);
	}

	$scope.addRow = () => {
		$scope.schema.addField($scope.newFieldName,	$scope.newFieldType, $scope.newField.options);
	};




});
