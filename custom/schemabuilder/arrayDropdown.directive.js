app.directive('arrayDropdown', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/dropdowns/arraydropdown.html',
        controller: 'SchemaBuilderCtrl',
        scope :{
        	method:'&'
        }
    };
});