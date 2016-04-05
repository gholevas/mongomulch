app.directive('seedPrimitive', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/seeder/seeder.primitive.directive.html',
        scope: {
            question: "="
        },
        controller: "SeederCtrl",
        link: function(scope) {


            scope.StrOpitons = ['word', 'sentence', 'integer', 'floating', 'first', 'last', 'email', 'address', 'city', 'phone', 'url', 'bool', 'date', 'hour','minute', 'year',  'enum']


        }
    };
});

