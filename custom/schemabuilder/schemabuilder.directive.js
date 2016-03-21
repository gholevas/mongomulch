app.directive('schemaBuilder', function() {
    return {
        restrict: 'E',
        templateUrl: 'custom/templates/schemabuilder.directive.html',
        controller: 'SchemaBuilderCtrl',
        // scope: {
        //     submit: "="
        // }

    };
});