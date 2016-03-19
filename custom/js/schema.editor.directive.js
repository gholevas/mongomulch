app.directive('schemaEditor', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/schemaeditor.directive.html',
        controller: 'SchemaBuilderCtrl'
        // scope: {
        //     submit: "="
        // }

    };
});