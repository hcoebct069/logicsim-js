//loader.js -- loads external module


//var fs = require('browserify-fs');
var fs = require('fs');
var helpers = require('./helpers.js');

var defaultPath = "./example_modules/";

var load = function(moduleName, callback, optionalModuleRootPath) {
  // var isComplete = false;
  // var jsonData = false;
  optionalModuleRootPath = optionalModuleRootPath || defaultPath;
  fs.readFile(optionalModuleRootPath + moduleName + '.mod',
    'utf-8',
    function (err, data) {
      //console.log(data);
      var json;
      if ((json = helpers.tryParseJSON(data)) === false) {
        //Fallback
        //callback("Cannot Parse", false)
        callback(true, "Cannot Load");
      } else {
        callback(false, json); //Callback with json_data
        //jsonData = json;
        //isComplete = true;
      }
    });

    // var data = fs.readFileSync(optionalModuleRootPath + moduleName +
    // '.mod').toString();
};

/*
load("adder", function (data) {
  console.log(data);
});*/

module.exports.load = load;
module.exports.fs = fs; //FOR DEBUG