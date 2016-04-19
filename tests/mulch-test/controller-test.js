describe('SeederCtrl', function () {

    beforeEach(module('mongomulch'));

    var $rootScope;
    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    var SchemaFactory;
    beforeEach('Create SchemaFactory mock', inject(function ($q) {

        // MessagesFactory, when injected into the controller,
        // will expose a .sendMessage method that is a mocked
        // sinon function
        SchemaFactory = {
            getSchemas: sinon.stub()
            //what it returns
        };

        // When this method gets called, it will return a promise
        // that resolves to the passed in object.
        SchemaFactory.getSchemas.returns($q.when([{
            name: 'joe@gmail',
            id: 12345,
            fields: [
                {
                    "name": "tfff",
                    "type": "String",
                    "selectedArrType": null,
                    "selectedEmbed": null,
                    "reference": null,
                    "options": {}
                }]
            
        }]));

    }));

    var controllersScope;
    beforeEach(inject(function ($controller) {
        controllersScope = $rootScope.$new();
        $controller('SeederCtrl', {
            $scope: controllersScope,
            SchemaFactory: SchemaFactory,
            QuestionsFactory:{}
        })
    }));

    describe('initalization', function () {

        it('should put on $scope.validations to be an array', function () {
            expect(controllersScope.validations).to.be.a('function');
            //expect(controllersScope.messages.length).to.be.equal(0);
        });

        xit('should put on $scope.submitMessage a function', function () {
            expect(controllersScope.submitMessage).to.be.a('function');
        });

    });

   xdescribe('submitMessage function when invoked', function () {

        it('should call MessagesFactory.sendMessage with $scope.currentMessage', function () {
            controllersScope.currentMessage = {body: 'Hey! Listen!'};
            controllersScope.submitMessage();
            expect(MessagesFactory.sendMessage.calledWith(controllersScope.currentMessage)).to.be.equal(true);
        });

        it('should use the resolved value from MessagesFactory.sendMessage\
            and add it to the messages array', function () {
            controllersScope.currentMessage = {body: 'Hullllooooo'};
            controllersScope.submitMessage();
            $rootScope.$digest();
            expect(controllersScope.messages.length).to.be.equal(1);
            expect(controllersScope.messages[0]).to.be.deep.equal({
                from: {email: 'joe@gmail'},
                to: {email: 'you@gmail'},
                body: 'Hello there!'
            });
        });

    });

});