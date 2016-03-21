app.directive('schemaEditor', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/schemabuilder/main/schemaeditor.directive.html',
        controller: 'SchemaBuilderCtrl'
        // scope: {
        //     submit: "="
        // }

    };
});