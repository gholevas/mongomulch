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


function save_schema(schemas, path) {
    var schemaArr = schemas;

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


function generate_schema(schema) {


    var schemaStr = 'var mongoose = require("mongoose");' + "\n \n"  + 'var schema = new mongoose.Schema({';
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

function parse_name_type(field) {
    var fieldStr = '';

    //do switch case

    if (field.type === "Array of...") {
        if (field.selectedArrType != 'String' || field.selectedArrType != 'Number' || field.selectedArrType != 'Boolean' || field.selectedArrType != 'Buffer' || field.selectedArrType != 'Date' ) {
            fieldStr += field.name + ':[{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.selectedArrType + '"}]';
        } else {

            fieldStr += field.name + ':{ type: ' + '[' + field.selectedArrType + ']' + ', ' + parse_options(field.options) + '}';

        }

    } else if (field.type === "Embed...") {
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedEmbed + ']' + ', ' + parse_options(field.options) + '}';

    } else if (field.type === 'Reference to...') {

        fieldStr += field.name + ':{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.reference + '",' + parse_options(field.options) + '}';

    } else {

        fieldStr += field.name + ':{ type: ' + field.type + ', ' + parse_options(field.options) + '}';
    }

    return fieldStr;

}

//pasrses the options into a string 
function parse_options(schemaOptions) {

    var optionStr = '';
    var size = Object.keys(schemaOptions).length;

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