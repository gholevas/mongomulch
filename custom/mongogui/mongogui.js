app.config(function($stateProvider) {
    $stateProvider.state('mongogui', {
        url: '/mongogui',
        templateUrl: 'custom/mongogui/mongogui.html',
        controller: 'MongoGuiCtrl'
    });
});

app.controller("MongoGuiCtrl", function($scope, $stateParams, $state, SchemaFactory) {

	// $scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	// $scope.addSchema = (schemaName) => {
	// 	SchemaFactory.addSchema(schemaName);
	// }

	// $scope.addRow = () => {
	// 	$scope.schema.addField($scope.newFieldName,	$scope.newFieldType, $scope.newField.options);
	// };

});
