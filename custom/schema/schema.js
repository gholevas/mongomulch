// 'use strict';

// var mongoose = require('mongoose'),
// 		Schema = mongoose.Schema,
// 		ObjectId = Schema.ObjectId;

// var fields = {
// <% schemaFields.forEach(function(field, index) {
// 	switch(field.split(":")[1]){
// 		case 'String':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break;
// 		case 'Number':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; 
// 		case 'Date':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " , default: Date.now }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; 
// 		case 'Buffer':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break;
// 		case 'Boolean': %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; 
// 		case 'Mixed': %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break;
// 		case 'ObjectId': 	%>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; 
// 		case 'Array': %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; } }) %>
// };

// var <%= lowSchemaName %>Schema = new Schema(fields);

// module.exports = mongoose.model('<%= capSchemaName %>', <%= lowSchemaName %>Schema);

var SchemBuilder = (arrayOfSchema) => {

	arrayOfSchema.forEach((el) => {

		return dosomething(el);

	});


}



function generate_schema (schema) {
	var schemaStr ='var schema = new mongoose.Schema({';
	var fieldLength = schema.fields.length;
	
	schema.fields.forEach((field,index) => {
		if(index === fieldLength-1){
			schemaStr += "\n" + parse_name_type(field) + "\n" + "});"
		}
		schemaStr += "\n" + parse_name_type(field) + ",";
	})

	return schemaStr;

}

function parse_name_type (field){
	var fieldStr ='';

	if(field.type === "Array") {
		//do something
	} else{

		fieldStr += field.name +':{ type: ' + field.type + ', ' + parse_options(field.options) + '}';
	}

	return fieldStr;

}

//pasrses the options into a string 
function parse_options (schemaOptions){

	var optionStr ='';
	var size = Object.keys(schemaOptions).length;

	for (var i = 0; i < size; i++){
	    console.log(Object.keys(schemaOptions)[i]);

        if(i === size-1) {
            optionStr += Object.keys(schemaOptions)[i] + ': ' + schemaOptions[Object.keys(schemaOptions)[i]];
        }
        else {
             optionStr += Object.keys(schemaOptions)[i] + ': ' + schemaOptions[Object.keys(schemaOptions)[i]] + ', ';
        }
            
	}

	return optionStr;
}




/*

0: Schema
$$hashKey: "object:24"
fields: Array[5]
0: Field
1: Field
2: Field
3: Field
4: Field
length: 5
__proto__: Array[0]
id: "56f01f923455e3c92af9130e"
name: "User"
__proto__: Schema

1: Schema
$$hashKey: "object:169"
fields: Array[2]
0: Field
1: Field
length: 2
__proto__: Array[0]
id: "56f01ff73455e3c92af9130f"
name: "color"
__proto__: Schema
length: 2
__proto__: Array[0]

0: Schema
$$hashKey: "object:24"
fields: Array[5]
0: Field
$$hashKey: "object:45"
name: "name"
options: Object
type: "String"
__proto__: Field


*/


