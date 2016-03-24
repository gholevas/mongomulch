app.directive('seedPrimitive', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/seeder/seeder.primitive.directive.html',
        scope:{
        	schema: "="
        },
        controller: "SeederCtrl"
    };
});
