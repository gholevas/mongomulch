app.directive('referenceDropdown', function(SchemaFactory) {
    return {
        restrict: 'E',
        templateUrl: 'custom/schemabuilder/dropdowns/referencedropdown.html',
        controller: 'SchemaBuilderCtrl',
        scope: {
            method: "&"
        },
        link : function(scope){
        	scope.schemas = SchemaFactory.getSchemas();

        }

    };
});