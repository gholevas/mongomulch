app.config(function($stateProvider) {
    $stateProvider.state('seeder', {
        url: '/seeder',
        templateUrl: 'app/seeder/seeder.html',
        controller: 'SeederCtrl'
    })
});


app.controller("SeederCtrl", function($scope, $rootScope, SchemaFactory, QuestionsFactory) {


    $scope.questions = QuestionsFactory.getQuestions();
    $scope.schemas = SchemaFactory.getSchemas();

    $scope.validations = (field) => {
        
        if(field.type === 'Reference to...' ){
            return true;
        }
        else if(field.type === 'Array of...'){
            if(field.selectedArrType != "Number" && field.selectedArrType != "Boolean" && field.selectedArrType != "Buffer" && field.selectedArrType != "String" && field.selectedArrType != "Date"){
                return true;
            } else {
                return false;
            }
        }

        return false;
    }


    $scope.submitAnswers = function(dbname) {
      

        $scope.error = null;
        var result = generate_schemas_for_seeds(SchemaFactory.getSchemas(),dbname, $scope.questions)
        console.log(result);
        try{
            eval(result);
        }
        catch(e){
            console.dir(e);
            $scope.error = e.message;
            var mongoose = require("mongoose");
            mongoose.models={}; mongoose.modelSchemas={}; mongoose.disconnect(); 
        }



    };

    //build obj that we'll provide to the seeder library
    function buildSeedObj(schemaDataObj) {
        var seedObj = {"_dependencies": {"Chance": "chance"} };
        for (var schema in schemaDataObj) {
            if (schemaDataObj.hasOwnProperty(schema)) {

                seedObj[schema] = {"_model": schema}
                
                for(fieldKey in schemaDataObj[schema].fields){
                    schemaDataObj[schema].fields[fieldKey] = "=new Chance()."+schemaDataObj[schema].fields[fieldKey]+"()";
                }

                for(var i=0; i<schemaDataObj[schema].amount; i++){
                    seedObj[schema][schema.toLowerCase() + i] = schemaDataObj[schema].fields;
                }
            
            }
        }
        return seedObj;
    }

    function fieldsObj(fields) {

        var tempObj = {};

        fields.forEach((field) => tempObj[field.name] = field.hint);



        return tempObj;

    }



    $scope.data = {
        selectedIndex: 0,
        bottom: false
    };
    $scope.next = function() {
        $scope.data.selectedIndex = $scope.data.selectedIndex + 1;
    };

    $scope.previous = function() {
        $scope.data.selectedIndex = $scope.data.selectedIndex - 1;
    };

});