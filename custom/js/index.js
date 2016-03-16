var app = angular.module("mongomulch", []);

app.controller("AppCtrl", function($scope) {



});


app.directive('navbar', function() {
  return {
  	restrict: 'E',
    templateUrl: '../templates/'
  };
});