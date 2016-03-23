app.config(function($stateProvider) {
    $stateProvider.state('seeder', {
        url: '/seeder',
        templateUrl: 'custom/seeder/seeder.html',
        controller: 'SeederCtrl'
    })
});


app.controller("SeederCtrl", function($scope, $rootScope, SchemaFactory) {

    // $scope.data = {
    //   selectedIndex: 0,
    //   bottom: false
    // };
    //  $scope.next = function() {
    //     $scope.showWarningMsg(false);
    //     $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    // };

    // $scope.previous = function() {
    //     $scope.showWarningMsg(false);
    //     $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    // };

});

