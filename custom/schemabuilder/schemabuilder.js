app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/schemabuilder/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {

	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	//not needed, schemas are added from sidebar
	// $scope.addSchema = (schemaName) => {
	// 	SchemaFactory.addSchema(schemaName);
	// }

	//seemingly not being used
	// $scope.addRow = () => {
	// 	$scope.schema.addField($scope.newFieldName,	$scope.newFieldType, $scope.newField.options);
	// };

});
