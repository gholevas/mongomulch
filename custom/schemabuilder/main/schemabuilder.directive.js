app.directive('schemaBuilder', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/schemabuilder/main/schemabuilder.directive.html',
        controller: 'SchemaBuilderCtrl',
        // scope: {
        //     submit: "="
        // }

    };
});