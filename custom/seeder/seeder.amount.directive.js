app.directive('seedAmount', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/seeder/seeder.amount.directive.html',
        scope:{
        	question: "="
        },
        controller: "SeederCtrl"
    };
});
