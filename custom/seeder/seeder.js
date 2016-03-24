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
    console.log($scope.questions);

  


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
