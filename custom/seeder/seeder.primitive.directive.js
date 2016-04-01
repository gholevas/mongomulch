app.directive('seedPrimitive', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/seeder/seeder.primitive.directive.html',
        scope: {
            question: "="
        },
        controller: "SeederCtrl",
        link: function(scope) {


            scope.StrOpitons = ['word', 'sentence', 'integer', 'floating', 'first', 'last', 'email', 'address', 'city', 'phone', 'url', 'bool', 'date', 'hour','minute', 'year',  'enum']


        }
    };
});

// app.directive('validateGreater', function() {
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         link: function(scope, element, attr, ctrl) {
//             function greaterValidFn(ngModelValue) {

//                 //this only works because the elements share scope somehow
//                 console.log(scope.rangeForm.max.$modelValue, scope.rangeForm.min.$modelValue)
//                 if (scope.rangeForm.max.$modelValue > scope.rangeForm.min.$modelValue) {
//                     ctrl.$setValidity('greaterValidator', true);
//                 } else {
//                     ctrl.$setValidity('greaterValidator', false);
//                 }

//                 return ngModelValue;
//             }
//             ctrl.$parsers.push(greaterValidFn);
//         }
//     };
// });