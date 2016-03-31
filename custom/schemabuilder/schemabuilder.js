app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'custom/schemabuilder/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {


	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	$scope.deleteField = (schemaField) => {
		$scope.schema.deleteField(schemaField);
	}

	//not needed, schemas are added from sidebar
	// $scope.addSchema = (schemaName) => {
	// 	SchemaFactory.addSchema(schemaName);
	// }

	//seemingly not being used
	// $scope.addRow = () => {
	// 	$scope.schema.addField($scope.newFieldName,	$scope.newFieldType, $scope.newField.options);
	// };

});


app.filter('plural', function() {
    return function(input) {
        if(input){
            if(input.substr(input.length-1).toLowerCase()=="s")
                return input;
            else 
                return input+"s";
        }
        return input;
    }
});