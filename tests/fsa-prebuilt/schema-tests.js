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
       // var schemas =[];
        // Storage.
        // path.join(__dirname, '../../')
    }));

    it('should have path', function () {
        // expect(path).to.be.an('object');
    });

    describe('Schema Factory', function () {

      //  var newSchema = new Schema('Test2',12345);


        it('should have a schema constructor', function () {
            expect(SchemaFactory.Schema).to.be.a('function');
        });

        it('should return type of shcema ', function (done) {
            Storage.loadConfStore('/Users/JaiPrasad/Desktop/ecomm').then(function(res){
                SchemaFactory.initialize();
                var currentSchemas = SchemaFactory.getSchemas();
               expect(currentSchemas).to.be.a('Array');
               done();
            }).catch(function(err){
                console.log(err);
            })
          

        });

        it('should add a schema and return it by name ', function (done) {
            Storage.loadConfStore('/Users/JaiPrasad/Desktop/ecomm').then(function(res){
                SchemaFactory.initialize();
                SchemaFactory.addSchema("Test2");
                var addedSchema = SchemaFactory.getSchemaByName("Test2");
                //console.log(addedSchema);
               expect(addedSchema.name).to.eql("Test2");
               done();
            }).catch(function(err){
                console.log(err);
            })
          

        });


        it('should get shchema by ID ', function (done) {
            Storage.loadConfStore('/Users/JaiPrasad/Desktop/ecomm').then(function(res){
                SchemaFactory.initialize();
                SchemaFactory.addSchema("Test3");

                var addedSchema = SchemaFactory.getSchemaByName("Test3");
                var idSchema = SchemaFactory.getSchemaById(addedSchema.id)
               expect(addedSchema).to.deep.equal(idSchema);
               done();
            }).catch(function(err){
                console.log(err);
            })
          

        });

    });

});













