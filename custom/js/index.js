var app = angular.module("mongomulch", ['ui.router']);

window.$ = window.jQuery = require('./assets/js/jquery.min.js');

app.controller("AppCtrl", function($scope) {



});

app.config(function($stateProvider) {
    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'custom/templates/index.html',
        controller: 'StoreCtrl'
    });
});

app.directive('navbar', function() {
  return {
  	restrict: 'E',
    templateUrl: 'custom/templates/navbar.html'
  };
});

app.directive('sidebar', function() {
  return {
  	restrict: 'E',
    templateUrl: 'custom/templates/sidebar.html'
  };
});