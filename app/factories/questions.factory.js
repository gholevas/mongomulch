app.factory('QuestionsFactory', function($rootScope, SchemaFactory) {
    
    //sorts the order of the questions by the number of reference in each schema 
	var sortByNumRefs = function(schemas){
		var orderMap = schemas.map(function(schema){
			var refCount = schema.fields.reduce(function(prevCount, currField){
				var isRef = (
					currField.type.toString().indexOf("Array") > -1 ? 1 :
					currField.type.toString().indexOf("Embed") > -1 ? 1 :
					currField.type.toString().indexOf("Reference") > -1 ? 1 :
					0)

				return prevCount + isRef;
			}, 0)
			return {id: schema.id, count: refCount};
		});

		orderMap.sort(function(a, b){
			return b.count - a.count;
		});

		return orderMap.map(function(order){
			return SchemaFactory.getSchemaById(order.id);
		});
	}

//makes questions for each schema 
	var buildQuestions = function(){
		var questionsArray = [];
		var schemas = SchemaFactory.getSchemas();
		var visited = [];
		_buildQuestions(schemas, questionsArray, visited);

		return questionsArray;
	}
	
	// helper function to make questions 
	var _buildQuestions = function(schemas, questionsArray, visited){

		schemas.forEach(function(schema){

			questionsArray.push({text: "How many "+ (schema.name.substr(schema.name.length-1)=="s"?schema.name:schema.name+"s") + " do you want?", Qtype: "amountQ", name:schema.name, fields:schema.fields});
			questionsArray.push({text: "Please provide hint for fields in "+ schema.name, Qtype: "hintsQ",name:schema.name, fields:schema.fields});
			

		});
		
	}


    return {
    	getQuestions: function(){
    		return buildQuestions();
    	}
    };

});