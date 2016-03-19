app.directive('optionsDropdown', function() {
  return {
  	restrict: 'E',
    templateUrl: 'custom/templates/optionsdropdown.directive.html',
    scope: {
    	field: "="
    },
    link: function(scope,e,a){
    	// scope.myFilter = function(optionsObj){
    	// 	return Object.keys(optionsObj).reduce((prev, key) => {return prev==""?key:prev+", "+key; },"");
    	// };
    	scope.deletePropIfNoValue = function(field){
    		if(!scope.field.options[field]){
    			console.log(field);
    			delete scope.field.options[field];
    		}
    	}
    }
  };
});