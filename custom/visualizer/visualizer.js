app.config(function($stateProvider) {
    $stateProvider.state('visualizer', {
        url: '/visualizer',
        templateUrl: 'custom/visualizer/visualizer.html',
        controller: 'VisualizerCtrl'
    })
});


app.controller("VisualizerCtrl", function($scope, $rootScope, SchemaFactory) {
    var reloadSchemas = function() {
        $scope.schemas = SchemaFactory.getSchemas();
        
    	console.log("reloading in vis ");
    }
    $rootScope.$on('newSchema', reloadSchemas);

});
