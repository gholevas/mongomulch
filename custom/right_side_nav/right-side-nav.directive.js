app.directive('rightSideNav', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/right_side_nav/right-side-nav.directive.html',
        controller: 'RightSideNavCtrl'
    };
});


app.controller('RightSideNavCtrl', function($scope, $timeout, $mdSidenav, SchemaFactory) {
        console.log($scope.schemas);
    function resetField() {
        $scope.field = {
            options: {}
        };

        $scope.defaultValue ='';
    }
    resetField();
    //if array scope.field.type is [String]

    $scope.saveField = function() {
       // console.log($scope.field);
        

        if($scope.field.type === "Array of..."){
            $scope.field.type = '['+$scope.selectedArrType+']';
            $scope.schema.addField($scope.field)
            resetField();
            $mdSidenav('right').close()
        } 
        else if($scope.field.type === 'Embed...') {
            $scope.field.type = '['+$scope.selectedEmbed+']';
            $scope.schema.addField($scope.field)
            resetField();
            $mdSidenav('right').close()
        } 
        else if($scope.field.type === 'Reference to...') {
            $scope.field.type = 'mongoose.Schema.Types.ObjectId';
            $scope.field.options['ref'] = $scope.selectedSchema;
            $scope.schema.addField($scope.field)
            resetField();
            $mdSidenav('right').close()
        } 
        else{
             if($scope.defaultValue){
                $scope.field.options['default'] = $scope.defaultValue;
                $scope.schema.addField($scope.field);
                resetField();
                $mdSidenav('right').close();

            } else{
                 $scope.schema.addField($scope.field);
                resetField();
               $mdSidenav('right').close();

            }
           
          
        }
            //$scope.field.type = '['+$scope.selectedEmbed+']';å
        
    }


    $scope.typeArr = ['String', 'Number', 'Boolean', 'Buffer', 'Date', 'Array of...', 'Reference to...', 'Embed...'];
    $scope.arrOf = ['String', 'Number', 'Boolean', 'Date', 'Buffer'];
    $scope.possibleOptions = ['Unique', 'Required', 'Select', 'Sparse', 'Text'];
    
    $scope.toggle = function(option) {
        if($scope.field.options[option]) delete $scope.fields.options[option];
        else $scope.field.options[option] = true;


        // var idx = $scope.field.options.indexOf(option);
        // if (idx > -1) $scope.field.options.splice(idx, 1);
        // else $scope.field.options.push(option);
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
