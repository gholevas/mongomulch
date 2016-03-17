app.config(function($stateProvider) {
    $stateProvider.state('visualizer', {
        url: '/visualizer',
        templateUrl: 'custom/templates/visualizer.html',
        controller: 'VisualizerCtrl'
    })
});


app.controller("VisualizerCtrl", function($scope, $rootScope, SchemaFactory) {
    var reloadSchemas = function(){
        $scope.schemas = SchemaFactory.getSchemas();
        console.log("reloading in visualizer", $scope.schemas);
    }
    $rootScope.$on('newSchema', reloadSchemas);
});
