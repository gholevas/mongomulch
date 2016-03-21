//using mongoose to generate unique IDs for our schemas..
var mongoose = require('mongoose');

app.factory('SchemaFactory', function($http, $rootScope, Storage) {
    

    var Schema = function(name, id, fields){
        this.name = name || "";
        this.id = id ||  mongoose.Types.ObjectId().toString();
        this.fields = fields || [];
    }

    Schema.prototype.addField = function(name, type, options){
        this.fields.push(new Field(name,type,options));
        $rootScope.$broadcast('newField', this.schemaId);
        Storage.set('schemas', schemas);
    }

    var Field = function(name, type, options){
        this.name = name || "";
        this.type = type || String; //should we use the actual type or a string e.g. Number vs "Number"
        this.options = options || {select: true};
    }

    var convertPlainToSchema = function(sObj){
        return new Schema(sObj.name, sObj.id, sObj.fields.map(f => new Field(f.name, f.type, f.options)))
    }

    var schemas = Storage.get('schemas').map(sObj => convertPlainToSchema(sObj) ) || []; //root data structure

    return {
        Schema: Schema,
        Field: Field,
        getSchemas: function() {
            return schemas;
        },
        addSchema: function(name){
            var newSchema = new Schema(name);
            schemas.push(newSchema);
            Storage.set('schemas', schemas);
            $rootScope.$broadcast('newSchema', newSchema.id);
        },
        deleteSchema: function(){
            // schemas.indexOf()
        },
        deleteAll: function(){
            schemas = [];
            Storage.set('schemas', schemas);
        },
        getSchemaById: function(id){
            return schemas.filter(schema => schema.id === id )[0];
        }
    };

});

