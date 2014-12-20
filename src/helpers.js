var util = require('util');
var Exceptions = require('./exceptions.js')
  
var mapMultipleArrayToObj = function (arrayOfArrays, defaultValue) {
  console.log (util.inspect (arrayOfArrays,false,null) );
  var returnObj = {};
  for (key_outer in arrayOfArrays) {
    var array = arrayOfArrays[key_outer];
    for (key_inner in array) {
      returnObj[array[key_inner]] = defaultValue || false; 
    }
  }
  return returnObj;
}

var mapArrayToArrayUsingObj = function (arrayOfKeys, objectToUse) {
  var returnArr = [];
  for (var i = arrayOfKeys.length - 1; i >= 0; i--) {
    if (objectToUse[arrayOfKeys[i]] === undefined) {
      throw new  Exceptions.VariableNotFoundException("Unknown Variable: " +
        arrayOfKeys[i]);
      return;
    }
    returnArr.push(objectToUse[arrayOfKeys[i]]);
  };
  return returnArr;
}

module.exports.mapMultipleArrayToObj = mapMultipleArrayToObj;
module.exports.mapArrayToArrayUsingObj = mapArrayToArrayUsingObj;