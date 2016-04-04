// var path = require('path');

describe('SchemaFactory', function () {

    beforeEach(module('mongomulch'));

    var $rootScope;
    beforeEach('Get tools', inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    var SchemaFactory;
    var Storage;
    beforeEach('Get factories', inject(function (_SchemaFactory_, _Storage_) {
        SchemaFactory = _SchemaFactory_;
        Storage = _Storage_;
        // Storage.
        // path.join(__dirname, '../../')
    }));

    it('should have path', function () {
        // expect(path).to.be.an('object');
    });

    describe('Schema Factory', function () {

        it('should have a schema constructor', function () {
            expect(SchemaFactory.Schema).to.be.a('function');
        });

    });

});