app.directive('seedPrimitive', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/seeder/seeder.primitive.directive.html',
        scope:{
        	question: "="
        },
        controller: "SeederCtrl",
        link : function (scope){


        	scope.StrOpitons = ['FirstName', 'LastName', 'Email', 'Password', 'Address', 'Phone Number', 'ImageUrl', 'Url' ]
        

        }
    };
});
