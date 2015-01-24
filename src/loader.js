//loader.js -- loads external module


var fs = require('fs');
var helpers = require('./helpers.js');

var defaultPath = "./example_modules/";

var load = function(moduleName, optionalModuleRootPath) {
  optionalModuleRootPath = optionalModuleRootPath || defaultPath;
 /* fs.readFile(optionalModuleRootPath + moduleName + '.mod',
    'utf-8',
    function (err, data) {
      console.log(data);
      var json;
      if ((json = helpers.tryParseJSON(data)) === false) {
        //Fallback
        callback("Cannot Parse", false)
      } else {
        callback(false, json); //Callback with json_data
      }
    });*/

  var data = fs.readFileSync(optionalModuleRootPath + moduleName +
    '.mod').toString();
      return helpers.tryParseJSON(data);
};

/*
load("adder", function (data) {
  console.log(data);
});*/

module.exports.load = load;