var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var mkdirp = require('mkdirp');


//generates index.js files 
function index_file(schemas, path) {

    var schemaStr = '\n\n';
    schemas.forEach((schema) => {
        schemaStr += 'require("./' + schema.name + '");' + '\n\n';
    })
    mkdirp(path + '/models', function(err) {
        fs.writeFile(path + "/models/index.js", schemaStr, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    });

}

//adds require line to index.js schema file 
function require_schemas(schemas){

    var requireStr ='';

    schemas.forEach((schema) => requireStr += 'var ' + schema.name + ' = require("./' + schema.name + '");' + '\n' )

}

//takes shcema and lays out scaffolding 
function generate_schema(schema) {

    var embededStr = embeded(schema);

    var schemaStr = 'var mongoose = require("mongoose");' + "\n \n" + embededStr + 'var schema = new mongoose.Schema({';
    var fieldLength = schema.fields.length;

    schema.fields.forEach((field, index) => {
        if (index === fieldLength - 1) {
            schemaStr += '\n' + parse_name_type(field) + '\n' + "});" + '\n \n' + 'mongoose.model("' + schema.name + '", schema);'
        } else {
            schemaStr += '\n' + parse_name_type(field) + ",";
        }

    })

    return beautify(schemaStr, { indent_size: 2 })

}


//saves schema to directory chosen
function save_schema(schemas, path) {

    mkdirp(path + '/models', function(err) {

        schemas.forEach((schema) => {

            fs.writeFile(path + "/models/" + schema.name + ".js", generate_schema(schema), function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        })
    });

}


//adds require for embedded schema 
function embeded (schema){
    console.log('got in here');
    var requireStr ='';
    schema.fields.forEach((field) => {
        if(field.type === "Embed...")
            requireStr += 'var ' + field.selectedEmbed + ' = require("./' + field.selectedEmbed + '");' + '\n\n';

    })
    return requireStr;
}

//converts the name of the field and type into a string
function parse_name_type(field) {
    var fieldStr = '';

    //do switch case

    if (field.type === "Array of...") {
        if (field.selectedArrType != 'String' && field.selectedArrType != 'Number' && field.selectedArrType != 'Boolean' && field.selectedArrType != 'Buffer' && field.selectedArrType != 'Date' ) {
            fieldStr += field.name + ':[{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.selectedArrType + '"' +  ' ' + parse_options(field.options) +  '}]';
        } else {

            fieldStr += field.name + ':{ type: ' + '[' + field.selectedArrType + ']' + ' ' + parse_options(field.options) + '}';

        }

    } else if (field.type === "Embed...") {
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedEmbed + ']' + ' ' + parse_options(field.options) + '}';

    } else if (field.type === 'Reference to...') {

        fieldStr += field.name + ':{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.reference + '"' + parse_options(field.options) + '}';

    } else {

        fieldStr += field.name + ':{ type: ' + field.type + ' ' + parse_options(field.options) + '}';
    }

    return fieldStr;

}




//pasrses the options into a string 
function parse_options(schemaOptions) {

    var optionStr = '';
    var size = Object.keys(schemaOptions).length;
    if(size>0) optionStr+=", "

    for (var i = 0; i < size; i++) {

        if (i === size - 1) {
            if (Object.keys(schemaOptions)[i] === 'default') {
                optionStr += Object.keys(schemaOptions)[i] + ': "' + schemaOptions[Object.keys(schemaOptions)[i]] + '"';
            } else {
                optionStr += Object.keys(schemaOptions)[i] + ': ' + schemaOptions[Object.keys(schemaOptions)[i]];
            }

        } else {
            if (Object.keys(schemaOptions)[i] === 'default') {
                optionStr += Object.keys(schemaOptions)[i] + ': "' + schemaOptions[Object.keys(schemaOptions)[i]] + '", ';
            } else {
                optionStr += Object.keys(schemaOptions)[i] + ': ' + schemaOptions[Object.keys(schemaOptions)[i]] + ', ';
            }

        }

    }

    return optionStr;
}




//creates seed file scafolding to be evaluated
function generate_schemas_for_seeds(schemas,DB_NAME, questions){

    console.log(DB_NAME);

    DB_NAME = DB_NAME || 'MulchSeed';

    var connectionString = 'mongodb://localhost:27017/'+DB_NAME;

    var amtObj = {};

    questions.forEach(function(question){
        if(question.amount) amtObj[question.name] = question.amount;
    })

    var connectionString= '\nvar db = mongoose.connect("'+connectionString+'").connection; '
    var headerString = 'var mongoose = require("mongoose"); '+connectionString+ ' \nvar mchance = require(\'mchance\')(db);\n '   //require(\'./mchance_mod.js\')(db);\n '


    var bodyStr = "";
    var footerStr = "db.seed({ ";

    schemas.map(function(schema, index){
        bodyStr+= generate_schema_With_Seed(schema);
        footerStr+= schema.name +": " + amtObj[schema.name] + (index==schemas.length-1?"": ",\n");
    });
// mongoose.connection.models = {};
    footerStr+= "}).then(function(dbCache){ mongoose.models={}; mongoose.modelSchemas={}; mongoose.disconnect(); console.log(dbCache); swal(\"Congrats!\", \"Your database has been seeded.\", \"success\");})"

    return headerString +'\n\n'+ bodyStr +'\n \n'+ footerStr;

}

//generates seed file for each schmea 
function generate_schema_With_Seed(schema, DB_NAME) {


    var schemaStr = ' \n var schema = new mongoose.Schema({'

    var fieldLength = schema.fields.length;

    schema.fields.forEach((field, index) => {
        if (index === fieldLength - 1) {
            schemaStr += '\n' + parse_name_type_with_seed(field) + '\n' + "});" + '\n \n' + 'mongoose.model("' + schema.name + '", schema);'
        } else {
            schemaStr += '\n' + parse_name_type_with_seed(field) + ",";
        }
    })
    schemaStr+="\n"
    return beautify(schemaStr, { indent_size: 2 })

}

function parse_name_type_with_seed(field) {
    var fieldStr = '';

    //do switch case

    if (field.type === "Array of...") {
        if (field.selectedArrType != 'String' && field.selectedArrType != 'Number' && field.selectedArrType != 'Boolean' && field.selectedArrType != 'Buffer' && field.selectedArrType != 'Date' ) {
            fieldStr += field.name + ': { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.selectedArrType + '"}], \nseedn: Math.floor(Math.floor(Math.random() * 100) / 5) }';
        } else {
            fieldStr += field.name + ': { type: [{ type: ' + field.selectedArrType + getSeedProp(field)+' ' + parse_options(field.options) + '}], \nseedn: Math.floor(Math.floor(Math.random() * 100) / 5)} ';
        }

    } else if (field.type === "Embed...") {
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedEmbed + ']' + ' ' + parse_options(field.options) + '}';

    } else if (field.type === 'Reference to...') {

        fieldStr += field.name + ':{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.reference + '",' + parse_options(field.options) + '}';

    } else {
        fieldStr += field.name + ':{ type: ' + field.type + ' ' + parse_options(field.options) + getSeedProp(field) + '}';
    }

    return fieldStr;

}

function getSeedProp(field){
    var seedProp = "";
    if(field.hint){
        if(field.hint == 'enum'){
            var enumArr = field.enums.split(" ");
            var enumStr = arrToString.bind(enumArr).call();
            var divBy = Math.floor(100/(enumArr.length+1));
            var idxStr = "[Math.floor(Math.floor(Math.random() * 100) / "+divBy+")]";
            seedProp="seed: function(){ return "+enumStr+idxStr+"}"
        } else if(field.hint == "integer" || field.hint == "floating") {
            
        } else {
            seedProp = "seed: mchance."+field.hint;
        }
    }
    if(seedProp) seedProp= ", \n" + seedProp;
    return seedProp;
}

//just for fun
function arrToString(){
    if(!Array.isArray(this))
        return "";

    var result = "[";
    for(var i=0; i<this.length; i++){
        result+="'"+this[i]+"'" + ((i<this.length-1)?",":"");
    }
    result+="]";
    return result;
}
