app.directive('referenceDropdown', function(SchemaFactory) {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/dropdowns/referencedropdown.html',
        controller: 'SchemaBuilderCtrl',
        scope: {
            method: "&"
        },
        link : function(scope){
        	scope.schemas = SchemaFactory.getSchemas();
        	console.log(scope.schemas);
        }

    };
});