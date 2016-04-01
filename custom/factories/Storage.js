const Configstore = require('configstore');
const path = require('path');
var expandTilde = require('expand-tilde');

app.factory('Storage', function($rootScope) {

    var configDir = (process.env.XDG_CONFIG_HOME || (expandTilde("~")+"/.config"))+"/configstore/";
    // var configDir = (process.env.XDG_CONFIG_HOME || "/Users/"+(process.env.USER || process.env.LOGNAME)+"/.config")+"/configstore/";
    var conf = null;
    var projKey = null;
    var currentRepo = null;

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
            if(!conf) return;
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
        saveFile: function(){
            var fileName = this.getProjName()+".mulch.json";
            copyFile(configDir+fileName, currentRepo+"/"+fileName, function(err){ if(err) alert("error while saving: " +err); else swal("Saved", currentRepo+"/"+fileName, "success"); });
        },
        newConfStore: function(pKey, dirName){
            projKey = pKey;
            currentRepo = dirName;
            var fileName = projKey+".mulch.json";

            conf = new Configstore(projKey+".mulch");

            copyFile(configDir+fileName, currentRepo+"/"+fileName, function(err){ if(err) alert("error creating mulch: "+err); });
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
            currentRepo = directory;
            var mulchFile = mulchFiles[0];
            projKey = mulchFile.substr(0, mulchFile.indexOf("."));

            conf = new Configstore(projKey+".mulch");
            var savedstuff = fs.readFileSync(directory+"/"+mulchFile);            
            conf.set(JSON.parse(savedstuff))
        }
    };

});

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
      else cb();
      cbCalled = true;
    }
  }
}
