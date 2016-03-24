const Configstore = require('configstore');
const path = require('path');
var expandTilde = require('expand-tilde');
// var storageAppKey = require(path.join(__dirname, './env')).storageAppKey;
// const conf = new Configstore(storageAppKey);

// conf.clear();

// //=> true

// // use dot notation to access nested properties (provided by `dot-prop` module)
// conf.set('bar.baz', true);

// console.log(conf.all);
// //=> { foo: 'bar', awesome: true, bar: { baz: true } }

// conf.del('awesome');

// console.log(conf.get('awesome'));
// //=> undefined

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      if(err) cb(err);
      else cb("all good")
      cbCalled = true;
    }
  }
}

app.factory('Storage', function($rootScope) {

    var conf = null;
    var projKey = null;
    // var configDir = (process.env.XDG_CONFIG_HOME || "/Users/"+(process.env.USER || process.env.LOGNAME)+"/.config")+"/configstore/";
    var configDir = (process.env.XDG_CONFIG_HOME || (expandTilde("~")+"/.config"))+"/configstore/";

    var tempPath_DELETETHIS="";

    return {
    	set: function(key, value){
            if(!conf) return;
    		conf.del(key);
    		conf.set(key, value);
    	},
    	get: function(key){
            if(!conf) return;
    		return conf.get(key);
    	},
    	del: function(key){
            if(!conf) return;
    		return conf.del(key);
    	},
    	all: function(){
            // if(!conf) return;
    		return conf.all;
    	},
        path: function(){
            if(!conf) return;
            return conf.path;
        },
        isProjLoaded: function(){
            return conf!=null;
        },
        getProjName: function(){
            return projKey;
        },
        newConfStore: function(pKey, dirName){
            projKey = pKey;
            var fileName = projKey+".mulch.json";

            conf = new Configstore(projKey+".mulch");

            copyFile(configDir+fileName, dirName+"/"+fileName, function(err){console.log("err in storage ",err)});
        },
        saveFile: function(){
            var fileName = this.getProjName()+".mulch.json";
            copyFile(configDir+fileName, dirName+"/"+fileName, function(err){console.log("err in storage ",err)});
        },
        loadDefault_YO_DELETETHISMETHOD: function(){
            conf = new Configstore("default.mulch");
        },
        unload_YO_DELETETHISMETHOD: function(){
            tempPath_DELETETHIS = conf.path;
            conf = null;
            // conf = new Configstore("default.mulch");
        },
        undo_unload_YO_DELETETHISMETHOD: function(){
            conf = new Configstore(tempPath_DELETETHIS);
            // conf = new Configstore("default.mulch");
        },
        loadConfStore: function(directory){
            var names = fs.readdirSync(directory);
            var mulchFiles = names.filter(function(name){
                return name.indexOf('.mulch.json') > -1;
            });
            if(mulchFiles.length>1){
                console.log("error, multiple mulch files found");
                return;
            }
            var mulchFile = mulchFiles[0];
            projKey = mulchFile.substr(0, mulchFile.indexOf("."));

            conf = new Configstore(projKey+".mulch");
            var savedstuff = fs.readFileSync(directory+"/"+mulchFile);            
            conf.set(JSON.parse(savedstuff))

        }
    };

});