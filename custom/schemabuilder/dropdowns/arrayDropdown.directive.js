app.directive('arrayDropdown', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/schemabuilder/dropdowns/arraydropdown.html',
        controller: 'SchemaBuilderCtrl',
        scope :{
        	method:'&'
        }
    };
});


//& takes in an expression to be evaluated, in this case it is a function invocation w/ parameters electArrType(x,y)
//to the the expression that is passed in to the '&', mehtod becomes a function that evalutes the expression 
