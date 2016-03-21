app.directive('rightSideNav', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/right_side_nav/right-side-nav.directive.html',
        controller: 'RightSideNavCtrl'
    };
});


app.controller('RightSideNavCtrl', function($scope, $timeout, $mdSidenav, $log, SchemaFactory) {

		$scope.refreshSchemas = function(){
			$scope.schemas = SchemaFactory.getSchemas()
			console.log($scope.schemas.length)
			if($scope.schemas.length === 0){
				$scope.schemas = [{name:'Create new Schema'}]
				console.log($scope.schemas)
			}
		}

		$scope.typeArr = ['String', 'Number', 'Boolean','Buffer','Array of...','Reference to...','Embed...'];
		$scope.arrOf = ['Strings', 'Numbers', 'Booleans','Buffers'];

        //checkbox stuff begins
        $scope.items = ['Unique', 'Required','Select', 'Sparse', 'Text'];
        $scope.selected = [];
        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) list.splice(idx, 1);
            else list.push(item);
        };
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        //checkbox stuff ends

        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function() {
            return $mdSidenav('right').isOpen();
        };
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
    })
    .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function() {
                    $log.debug("close RIGHT is done");
                });
        };
    });
