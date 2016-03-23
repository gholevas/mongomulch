var fs = require('fs');
var beautify = require('js-beautify').js_beautify;


function save_schema(schema) {
    fs.writeFile(__dirname + "/test.js", generate_schema(schema), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}



function generate_schema(schema) {
    console.log(schema[0].fields);

    var schemaStr = 'var mongoose = require("mongoose");' + "\n \n" + 'var schema = new mongoose.Schema({';
    var fieldLength = schema[0].fields.length;

    schema[0].fields.forEach((field, index) => {
        if (index === fieldLength - 1) {
            schemaStr += '\n' + parse_name_type(field) + '\n' + "});" + '\n \n' + 'mongoose.model("' + schema[0].name +'", schema);'
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
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedArrType + ']' + ', ' + parse_options(field.options) + '}';
        //do something
    } else if (field.type === "Embed...") {
        fieldStr += field.name + ':{ type: ' + '[' + field.selectedEmbed + ']' + ', ' + parse_options(field.options) + '}';

    } else if (field.type === 'Reference to...') {

        fieldStr += field.name + ':{ type: mongoose.Schema.Types.ObjectId, ref: "' + field.reference + '",'  + parse_options(field.options) + '}';

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
            if(Object.keys(schemaOptions)[i] === 'default'){
                optionStr += Object.keys(schemaOptions)[i] + ': "' + schemaOptions[Object.keys(schemaOptions)[i]] + '"';
            } else{
                optionStr += Object.keys(schemaOptions)[i] + ': ' + schemaOptions[Object.keys(schemaOptions)[i]];
            }
            
        } else {
            if(Object.keys(schemaOptions)[i] === 'default'){
                optionStr += Object.keys(schemaOptions)[i] + ': "' + schemaOptions[Object.keys(schemaOptions)[i]] + '", ';
              } else{
                optionStr += Object.keys(schemaOptions)[i] + ': ' + schemaOptions[Object.keys(schemaOptions)[i]] + ', ';
              }
            
        }

    }

    return optionStr;
}


// var x = generate_schema ({name:'User', 
// fields:[{name:'George', type:"String",options:{select:true, unique:true, default:"yay"}},{name:'Prakash', type:"String",options:{select:true, unique:true, default:"yay"}},{name:'Jai', type:"String",options:{select:true, unique:true, default:"yay"}}]})
