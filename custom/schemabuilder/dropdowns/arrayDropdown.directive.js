app.directive('arrayDropdown', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/schemabuilder/dropdowns/arraydropdown.html',
        controller: 'SchemaBuilderCtrl',
        scope :{
        	method:'&'
        }
    };
});