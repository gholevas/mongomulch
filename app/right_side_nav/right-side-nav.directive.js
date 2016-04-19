app.directive('rightSideNav', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/right_side_nav/right-side-nav.directive.html',
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
//saves field to schema 
    $scope.saveField = function() {
        console.log($scope.field, "field on controller");
        if ($scope.field.options.default === '') {
            delete $scope.field.options.default;
        }
        if ($scope.field.type === 'Array of...' || $scope.field.type === 'Reference to...' || $scope.field.type === 'Embed...') {
            delete $scope.field.options.default;
        }
        $scope.schema.addField($scope.field)
        resetField();
        $mdSidenav('right').close()
    }


    $scope.typeArr = ['String', 'Number', 'Boolean', 'Buffer', 'Date', 'Array of...', 'Reference to...', 'Embed...'];
    $scope.possibleOptions = ['unique', 'required', 'select', 'sparse', 'text'];

//
    $scope.toggle = function(option) {
        if ($scope.field.options[option]) {
            console.log('exists')
            delete $scope.field.options[option];
        } else $scope.field.options[option] = true;
    };

    $scope.exists = function(option) {
        return $scope.field.options[option] != null;
    };

//toggles open the right side nav
    $scope.toggleRight = function(schema, field) {
        if (field) $scope.field = field;
        else resetField();

        $scope.arrOf = ['String', 'Number', 'Boolean', 'Date', 'Buffer'];
        SchemaFactory.getSchemas().forEach(function(schema){

            $scope.arrOf.push(schema.name)

        })

        $scope.schema = schema;
        $mdSidenav('right').toggle()
    }


})
