app.directive('visSchema', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/visualizer/visualizer_schema.directive.html',
        scope:{
        	schema: "="
        }
    };
});
