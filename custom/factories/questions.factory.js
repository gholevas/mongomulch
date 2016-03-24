app.factory('QuestionsFactory', function($rootScope, SchemaFactory) {
    
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

	var buildQuestions = function(){
		var questionsArray = [];
		var schemas = sortByNumRefs(SchemaFactory.getSchemas());
		var visited = [];
		_buildQuestions(schemas, questionsArray, visited);

		return questionsArray;
	}
	
	var _buildQuestions = function(schemas, questionsArray, visited){

		schemas.forEach(function(schema){
			
			if(visited.indexOf(schema.name) > -1)
				return;
			visited.push(schema.name);

			questionsArray.push("How many "+ schema.name + "s do you want?");
			questionsArray.push("Please provide hint for fields in "+ schema.name);
			
			var childSchemas = schema.fields
			.map(field => field.selectedEmbed || field.reference || null )
			.filter(childSchemaOrNull => childSchemaOrNull?true:false)
			.map(schemaName => SchemaFactory.getSchemaByName(schemaName))

			_buildQuestions(childSchemas, questionsArray, visited);

		});
		
	}


    return {
    	getQuestions: function(){
    		return buildQuestions();
    	}
    };

});