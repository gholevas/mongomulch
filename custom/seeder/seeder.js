app.config(function($stateProvider) {
    $stateProvider.state('seeder', {
        url: '/seeder',
        templateUrl: 'custom/seeder/seeder.html',
        controller: 'SeederCtrl'
    })
});


app.controller("SeederCtrl", function($scope, $rootScope, SchemaFactory,QuestionsFactory) {

    // $scope.questions = [{
    //     text: 'How many Users would you like?',
    //     answers: []
    // }, {
    //     text: 'Select data types for these Users.',
    //     answers: []
    // }, {
    //     text: 'How many BlogPosts would you like each User to have?',
    //     answers: []
    // }];




    $scope.questions = QuestionsFactory.getQuestions();
    $scope.schemas = SchemaFactory.getSchemas ();


    

    $scope.submitAnswers = function(){
        var obj ={};

        console.log($scope.questions);

        for(var i=0; i<$scope.questions.length; i+=2){

            obj[$scope.questions[i].name] =  obj[$scope.questions[i].name] || {};
            obj[$scope.questions[i].name].amount = $scope.questions[i].amount;
            obj[$scope.questions[i].name].fields =  obj[$scope.questions[i].name].fields || fieldsObj($scope.questions[i].fields);
       
        }

        console.log(obj);

    }



    function fieldsObj (fields){

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
