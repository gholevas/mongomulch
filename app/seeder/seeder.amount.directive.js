app.directive('seedAmount', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/seeder/seeder.amount.directive.html',
        scope:{
        	question: "="
        },
        controller: "SeederCtrl"
    };
});
