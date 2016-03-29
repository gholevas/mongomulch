app.config(function($stateProvider) {
    $stateProvider.state('visualizer', {
        url: '/visualizer',
        templateUrl: 'custom/visualizer/visualizer.html',
        controller: 'VisualizerCtrl'
    })
});


app.controller("VisualizerCtrl", function($scope, $rootScope, SchemaFactory,angularLoad) {

    angularLoad.loadScript('assets/pages/jquery.sweet-alert.init.js').then(function() {
        // Script loaded succesfully.
        // We can now start using the functions from someplugin.js
    }).catch(function() {
        // There was some error loading the script. Meh
    });

    var reloadSchemas = function() {
        $scope.schemas = SchemaFactory.getSchemas();

        console.log("reloading in vis ");
    }
    $rootScope.$on('newSchema', reloadSchemas);

});
