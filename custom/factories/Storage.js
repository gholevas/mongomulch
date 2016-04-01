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
        openDir: function(){
            var shell = require('electron').shell;
            shell.showItemInFolder(currentRepo+"/");
            shell = null;
        },
        saveFile: function(){
            var fileName = this.getProjName()+".mulch.json";

            //TODO wrap this in a promise, return to whoever calls it
            //then do the swal in the ui layer
            //then make all swals time out
            copyFile(configDir+fileName, currentRepo+"/"+fileName, function(err){ 
                if(err) 
                    alert("error while saving: " +err); 
                else 
                    swal("Saved", currentRepo+"/"+fileName, "success"); 
            });
        },
        newConfStore: function(pKey, dirName){
            var names = fs.readdirSync(dirName);
            var mulchFiles = names.filter(function(name){
                return name.indexOf('.mulch.json') > -1;
            });
            projKey = pKey;
            currentRepo = dirName;
            var fileName = projKey+".mulch.json";

            //TODO: delete existing file at configDir+fileName
            //because below line makes new and also we dunno if success yet
            conf = new Configstore(projKey+".mulch");

            return new Promise(function(resolve, reject){
                if(mulchFiles.length>0){
                    reject({
                        title: "Project already created",
                        text: "Multiple .mulch.json files not allowed.\n " + dirName,
                        type: "error"
                    });
                }
                else copyFile(configDir+fileName, currentRepo+"/"+fileName, function(err){ 
                    if(err) {
                        reject({
                            title: "Error creating Mulch",
                            text: err.message,
                            type: "error"
                        });
                    } else {
                        resolve({
                            type: "success"
                        });
                    }
                });
            });
        },
        loadConfStore: function(directory){
            var names = fs.readdirSync(directory);
            var mulchFiles = names.filter(function(name){
                return name.indexOf('.mulch.json') > -1;
            });
            if(mulchFiles.length==0){
                swal("Project Not Found", "No .mulch.json file in " + directory, "error");
                return;
            }
            if(mulchFiles.length>1){
                swal("Multiple Files", "Multiple .mulch.json files found in " + directory, "error");
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
