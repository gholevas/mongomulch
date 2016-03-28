var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var mkdirp = require('mkdirp');


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

function require_schemas(schemas){

    var requireStr ='';

    schemas.forEach((schema) => requireStr += 'var ' + schema.name + ' = require("./' + schema.name + '");' + '\n' )

}


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



function embeded (schema){//ads require for embedded schema 
    console.log('got in here');
    var requireStr ='';
    schema.fields.forEach((field) => {
        if(field.type === "Embed...")
            requireStr += 'var ' + field.selectedEmbed + ' = require("./' + field.selectedEmbed + '");' + '\n\n';

    })
    return requireStr;
}


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

function generate_schemas_for_seeds(schemas,DB_NAME, questions){

    console.log(DB_NAME);

    DB_NAME = DB_NAME || 'MulchSeed';

    var connectionString = 'mongodb://localhost:27017/'+DB_NAME;

    var amtObj = {};

    questions.forEach(function(question){
        if(question.amount) amtObj[question.name] = question.amount;
    })

    var connectionString= '\nvar db = mongoose.connect("'+connectionString+'").connection; '
    var headerString = 'var mongoose = require("mongoose"); '+connectionString+ ' \nvar mchance = require(\'mchance\')(db);\n '

    var bodyStr = "";
    var footerStr = "db.seed({ ";

    schemas.map(function(schema, index){
        bodyStr+= generate_schema_With_Seed(schema);
        footerStr+= schema.name +": " + amtObj[schema.name] + (index==schemas.length-1?"": ",\n");
    });

    footerStr+= "}).then(function(dbCache){ mongoose.disconnect(); console.log(dbCache)})"

    return headerString +'\n\n'+ bodyStr +'\n \n'+ footerStr;


}


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
            fieldStr += field.name + ': { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.selectedArrType + '"}], \nseedn: 2}';
        } else {
            fieldStr += field.name + ': { type: [{ type: ' + field.selectedArrType + ', \nseed:mchance.'+field.hint+' ' + parse_options(field.options) + '}], \nseedn: 2} ';
        }

    } else if (field.type === "Embed...") {
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedEmbed + ']' + ' ' + parse_options(field.options) + '}';

    } else if (field.type === 'Reference to...') {

        fieldStr += field.name + ':{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.reference + '",' + parse_options(field.options) + '}';

    } else {

        fieldStr += field.name + ':{ type: ' + field.type + ' ' + parse_options(field.options) + (field.hint?", seed: mchance."+field.hint:"") + '}';
    }

    return fieldStr;

}

function parse_name_type(field) {
    var fieldStr = '';

    //do switch case

    if (field.type === "Array of...") {
        if (field.selectedArrType != 'String' && field.selectedArrType != 'Number' && field.selectedArrType != 'Boolean' && field.selectedArrType != 'Buffer' && field.selectedArrType != 'Date' ) {
            fieldStr += field.name + ':[{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.selectedArrType + '"}]';
        } else {

            fieldStr += field.name + ':{ type: ' + '[' + field.selectedArrType + ']' + ' ' + parse_options(field.options) + '}';

        }

    } else if (field.type === "Embed...") {
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedEmbed + ']' + ' ' + parse_options(field.options) + '}';

    } else if (field.type === 'Reference to...') {

        fieldStr += field.name + ':{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.reference + '",' + parse_options(field.options) + '}';

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


// var x = generate_schema ({name:'User', 
// fields:[{name:'George', type:"String",options:{select:true, unique:true, default:"yay"}},{name:'Prakash', type:"String",options:{select:true, unique:true, default:"yay"}},{name:'Jai', type:"String",options:{select:true, unique:true, default:"yay"}