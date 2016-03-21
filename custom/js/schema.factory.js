//using mongoose to generate unique IDs for our schemas..
var mongoose = require('mongoose');

app.factory('SchemaFactory', function($http, $rootScope) {
    
    var schemas = []; //root data structure

    var Schema = function(name){
        this.name = name || "";
        this.id = mongoose.Types.ObjectId().toString();
        this.fields = [];
    }

    Schema.prototype.addField = function(name, type, options){
        this.fields.push(new Field(name,type,options));
        $rootScope.$broadcast('newField', this.schemaId);
    }

    var Field = function(name, type, options){
        this.name = name || "";
        this.type = type || String; //should we use the actual type or a string e.g. Number vs "Number"
        this.options = options || {select: true};
    }

    return {
        Schema: Schema,
        Field: Field,
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
        getSchemaById: function(id){
            return schemas.filter(schema => schema.id === id )[0];
        }
    };

});

