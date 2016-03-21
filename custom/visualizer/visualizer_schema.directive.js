app.directive('visSchema', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/visualizer_schema.directive.html',
        scope:{
        	schema: "="
        }
    };
});
