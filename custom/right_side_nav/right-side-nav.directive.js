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
            options: []
        };
    }
    resetField();


    $scope.saveField = function() {
        $scope.schema.addField($scope.field)
        resetField();
        $mdSidenav('right').close()
    }


    $scope.typeArr = ['String', 'Number', 'Boolean', 'Buffer', 'Date', 'Array of...', 'Reference to...', 'Embed...'];
    $scope.arrOf = ['Strings', 'Numbers', 'Booleans', 'Dates', 'Buffers'];
    $scope.possibleOptions = ['Unique', 'Required', 'Select', 'Sparse', 'Text'];

    $scope.toggle = function(option) {
        var idx = $scope.field.options.indexOf(option);
        if (idx > -1) $scope.field.options.splice(idx, 1);
        else $scope.field.options.push(option);
    };
    $scope.exists = function(option) {
        return $scope.field.options.indexOf(option) > -1;
    };


    $scope.toggleRight = function(schema, field) {
        if (field) $scope.field = field;
        else resetField();
        $scope.schema = schema;
        $mdSidenav('right').toggle()
    }


})
