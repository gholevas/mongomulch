app.factory('SchemaFactory', function($http) {
	var schemas = [];
    return {
        getSchemas: function() {
            return schemas;
        },
        addSchema: function(name){
        	schemas.push(name);
        },
        deleteSchema: function(){

        }
    };
});
