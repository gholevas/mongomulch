app.directive('rightSideNav', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/right_side_nav/right-side-nav.directive.html',
        controller: 'RightSideNavCtrl'
    };
});


app.controller('RightSideNavCtrl', function($scope, $timeout, $mdSidenav, SchemaFactory) {

    function resetField() {
        $scope.field = {
            options: {}
        };
    }

    resetField();

    $scope.saveField = function() {
        if($scope.field.options.default === ''){
            delete $scope.field.options.default;
        }
        $scope.schema.addField($scope.field)
        resetField();
        $mdSidenav('right').close()
    }


    $scope.typeArr = ['String', 'Number', 'Boolean', 'Buffer', 'Date', 'Array of...', 'Reference to...', 'Embed...'];
    $scope.arrOf = ['String', 'Number', 'Boolean', 'Date', 'Buffer'];
    $scope.possibleOptions = ['Unique', 'Required', 'Select', 'Sparse', 'Text'];

    $scope.toggle = function(option) {
        if ($scope.field.options[option]) {
            console.log('exists')
            delete $scope.field.options[option];
        } else $scope.field.options[option] = true;
    };

    $scope.exists = function(option) {
        return $scope.field.options[option] != null;
    };


    $scope.toggleRight = function(schema, field) {
        if (field) $scope.field = field;
        else resetField();
        $scope.schema = schema;
        $mdSidenav('right').toggle()
    }


})
