app.factory('SchemaFactory', function($http, $rootScope) {
	var schemas = [];
    return {
        getSchemas: function() {
            return schemas;
        },
        addSchema: function(name){
        	var newSchema = new Schema(name);
        	schemas.push(newSchema);
        	$rootScope.$broadcast('newSchema', newSchema.id);
        },
        deleteSchema: function(){

        },
        //defaults to first available schema if id is null
        getSchemaById: function(id){
        	var scchma = schemas.filter(schema => schema.id === id )[0] || schemas[0];
        	return scchma;
        },
        addNewField: function(schemaId, name, type, options){
        	var field = new Field(name,type)//options;
        	this.getSchemaById(schemaId).fields.push(field);
        	$rootScope.$broadcast('newField', schemaId);
        }
    };
});

//using mongoose to generate unique IDs for our schemas..
var mongoose = require('mongoose');

function Schema(name){
	this.name = name || "";
	this.id = mongoose.Types.ObjectId().toString();
	this.fields = [];
}

function Field(name, type){
	this.name = name || "";
	this.type = type || String; //should we use the actual type or a string e.g. Number vs "Number"
}