app.directive('visSchema', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/visualizer/visualizer_schema.directive.html',
        scope:{
        	schema: "="
        }
    };
});
