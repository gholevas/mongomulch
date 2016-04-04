var app = angular.module("mongomulch", ['ui.router','ngMaterial', 'ui.bootstrap']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': '81c868',
    '100': '81c868',
    '200': '81c868',
    '300': '81c868',
    '400': '81c868',
    '500': '81c868',
    '600': '81c868',
    '700': '81c868',
    '800': '81c868',
    '900': '81c868',
    'A100': '81c868',
    'A200': '81c868',
    'A400': '81c868',
    'A700': '81c868',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });
  $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName')
    .dark();
});