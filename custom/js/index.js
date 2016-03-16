var app = angular.module("mongomulch", ['ui.router']);


app.controller("AppCtrl", function($scope) {


});

app.config(function($stateProvider) {
    $stateProvider
    .state('index', {
        url: '/',
        templateUrl: 'custom/templates/index.html',
        controller: 'StoreCtrl'
    })
    .state('visualizer', {
        url: '/visualizer',
        templateUrl: 'custom/templates/visualizer.html',
        controller: 'VisualizerCtrl'
    })
});


