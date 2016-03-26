app.directive('seedPrimitive', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/seeder/seeder.primitive.directive.html',
        scope:{
        	question: "="
        },
        controller: "SeederCtrl",
        link : function (scope){


        	scope.StrOpitons = ['word', 'sentence', 'integer', 'floating', 'first', 'last', 'email', 'address', 'phone', 'url', 'bool', 'date']
        

        }
    };
});
