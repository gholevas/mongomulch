var app = angular.module("mongomulch", []);

app.controller("AppCtrl", function($scope) {



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