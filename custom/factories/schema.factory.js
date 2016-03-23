//using mongoose to generate unique IDs for our schemas..
var mongoose = require('mongoose');

app.factory('SchemaFactory', function($http, $rootScope, Storage) {
    
    if(!Storage.get('schemas')) Storage.set('schemas',[]);

    var Schema = function(name, id, fields){
        this.name = name || "";
        this.id = id ||  mongoose.Types.ObjectId().toString();
        this.fields = fields || [];
    }

    Schema.prototype.addField = function(field){
        console.log('current fields',this.fields)
        console.log('new field',field)
        var edited = false;
        this.fields.forEach(function(onefield){
            if(onefield.name === field.name){
                onefield = field;
                edited = true;
            }
        })
        if(edited === false){
            this.fields.push(new Field(field.name,field.type,field.options,field.selectedArrType));
        }
        edited = false;
            Storage.set('schemas', schemas);

    }



    Schema.prototype.deleteField = function(field){
        this.fields.splice(this.fields.indexOf(field), 1);
        Storage.set('schemas', schemas);
        $rootScope.$broadcast('newField', this.schemaId);
    }    

    var Field = function(name, type, options, selectedArrType){
        this.name = name || "";
        this.type = type || String; //should we use the actual type or a string e.g. Number vs "Number"
        this.selectedArrType = selectedArrType || null;
        this.options = options || {select: true};
    }

    var convertPojoToSchema = function(sObj){
        return new Schema(sObj.name, sObj.id, sObj.fields.map(f => new Field(f.name, f.type, f.options, f.selectedArrType)))
    }

    var schemas = Storage.get('schemas').map(sObj => convertPojoToSchema(sObj) ) || []; //root data structure

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
        deleteSchema: function(schema){
            schemas.splice(schemas.indexOf(schema), 1);
            Storage.set('schemas', schemas);
        },
        deleteAll: function(){
            schemas = [];
            Storage.set('schemas', schemas);
        },
        getSchemaById: function(id){
            return schemas.filter(schema => schema.id === id )[0];
        },
        exportSchemas : function(){

            save_schema(schemas);
        }
    };

});

