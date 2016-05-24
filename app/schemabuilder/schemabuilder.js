app.config(function($stateProvider) {
    $stateProvider.state('schemabuilder', {
        url: '/schemabuilder/:schemaId',
        templateUrl: 'app/schemabuilder/schemabuilder.html',
        controller: 'SchemaBuilderCtrl'
    });
});

app.controller("SchemaBuilderCtrl", function($scope, $stateParams, $state, SchemaFactory) {


	$scope.schema = SchemaFactory.getSchemaById($stateParams.schemaId);

	$scope.deleteField = (schemaField) => {
		$scope.schema.deleteField(schemaField);
	}



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