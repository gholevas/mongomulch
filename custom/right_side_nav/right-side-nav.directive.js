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
        console.log($scope.field, "field on controller");
        if($scope.field.options.default === ''){
            delete $scope.field.options.default;
        }
        if($scope.field.type === 'Array of...' || $scope.field.type === 'Reference to...' || $scope.field.type === 'Embed...'){
            delete $scope.field.options.default;
        }
        $scope.schema.addField($scope.field)
        resetField();
        $mdSidenav('right').close()
    }


    $scope.typeArr = ['String', 'Number', 'Boolean', 'Buffer', 'Date', 'Array of...', 'Reference to...', 'Embed...'];
    $scope.possibleOptions = ['unique', 'required', 'select', 'sparse', 'text'];

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
        var schemas = SchemaFactory.getSchemas();
        
        //moved this down here in case of deleted schemas
        $scope.arrOf = ['String', 'Number', 'Boolean', 'Date', 'Buffer'];
        schemas.forEach(function(schema){
            // if($scope.arrOf.indexOf(schema.name) === -1){
                $scope.arrOf.push(schema.name)
            // }
        })

        $scope.schema = schema;
        $mdSidenav('right').toggle()
    }


})
