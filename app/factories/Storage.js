const Configstore = require('configstore');
const path = require('path');
var expandTilde = require('expand-tilde');

app.factory('Storage', function($rootScope) {

    var configDir = (process.env.XDG_CONFIG_HOME || (expandTilde("~") + "/.config")) + "/configstore/";
    // var configDir = (process.env.XDG_CONFIG_HOME || "/Users/"+(process.env.USER || process.env.LOGNAME)+"/.config")+"/configstore/";
    var conf = null;
    var projKey = null;
    var currentRepo = null;

    return {
        set: function(key, value) {
            if (!conf) return;
            conf.del(key);
            conf.set(key, value);
        },
        get: function(key) {
            if (!conf) return;
            return conf.get(key);
        },
        del: function(key) {
            if (!conf) return;
            return conf.del(key);
        },
        all: function() {
            if (!conf) return;
            return conf.all;
        },
        path: function() {
            if (!conf) return;
            return conf.path;
        },
        isProjLoaded: function() {
            return conf != null;
        },
        getProjName: function() {
            return projKey;
        },
        openDir: function(path) {
            var path = path || (currentRepo + "/");
            var shell = require('electron').shell;
            shell.showItemInFolder(path);
            shell = null;
        },
        saveFile: function() {
            var fileName = this.getProjName() + ".mulch";

            return new Promise(function(resolve, reject){
                copyFile(configDir + fileName + ".json", currentRepo + "/" + fileName, function(err) {
                    if (err)
                        reject({title: "Error while Saving", text: err.message, type: "error"});
                    else
                        resolve({title: "Saved Mulch", text: currentRepo + "/" + fileName, type: "success"})
                });
            });
        },
        newConfStore: function(pKey, dirName) {
            var mulchFiles = fs.readdirSync(dirName).filter(function(fileName) {
                return fileName.indexOf('.mulch') > -1;
            });

            return new Promise(function(resolve, reject) {
                if (mulchFiles.length > 0) {
                    reject({
                        title: "Project already created",
                        text: "Multiple .mulch files not allowed.\n " + dirName,
                        type: "warning"
                    });
                    return;
                }

                projKey = pKey;
                currentRepo = dirName;
                var fileName = projKey + ".mulch";

                conf = new Configstore(projKey + ".mulch");
                conf.clear();

                copyFile(configDir + fileName + ".json", currentRepo + "/" + fileName, function(err) {
                    if (err) {
                        reject({
                            title: "Error creating Mulch",
                            text: err.message,
                            type: "error"
                        });
                        return;
                    }

                    resolve({ type: "success" });
                });
            });
        },
        loadConfStore: function(directory) {
        
            var mulchFiles = fs.readdirSync(directory).filter(function(fileName) {
               
                return fileName.indexOf('.mulch') > -1;
            });

            return new Promise(function(resolve, reject) {

                if (mulchFiles.length == 0) {
                    reject({
                        title: "Project Not Found",
                        text: "No .mulch file in " + directory,
                        type: "warning"
                    });
                    return;
                }
                if (mulchFiles.length > 1) {
                    reject({
                        title: "Multiple Files",
                        text: "Multiple .mulch files found in " + directory,
                        type: "warning"
                    });
                    return;
                }

                var mulchFile = mulchFiles[0];

                fs.readFile(directory + "/" + mulchFile, 'utf8', function(err, data) {
                    if (err) {
                        reject({
                            title: "Error reading file",
                            text: err.message,
                            type: "error"
                        });
                        return;
                    }

                    currentRepo = directory;
                    projKey = mulchFile.substr(0, mulchFile.indexOf("."));
                    //TODO: what happens when the repo's fike branches from the store's?
                    //will it overwrite the store? Or will it merge
                    conf = new Configstore(projKey + ".mulch");
                    conf.set(JSON.parse(data))
                    
                    resolve({ type: "success" });
                    
                });
            });

        }
    };

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
                if (err) cb(err);
                else cb();
                cbCalled = true;
            }
        }
    }

});