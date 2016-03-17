app.directive('mulchModal', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/modal.directive.html',
        scope: {
            submit: "&"
        },
        require: "ngModel",
        link: function(scope, element, attrs, ngModelCtrl) {

            scope.addOption = function() {
            	var currOpts = ngModelCtrl.$viewValue;
            	ngModelCtrl.$setViewValue(currOpts.concat({ name: scope.optionName, value: scope.optionValue }));
                scope.optionName = '';
                scope.optionValue = '';
            };

            ngModelCtrl.$render = function(){
            	scope.options = ngModelCtrl.$viewValue;
            };

        }
        //FOR KNOWLEDGE
        // ,controller: function(){
        // 	this.test = function(){
        // 		console.log("hello");
        // 	}
        // }
    };
});

//FOR KNOWLEDGE
// app.directive('tempDirective', function() {
// 	return{
// 		restrict: "A",
// 		link: function(s,e,a, mmCtrl){
// 			console.log(mmCtrl);

// 		},
// 		require: "mulchModal"
// 	}
// });