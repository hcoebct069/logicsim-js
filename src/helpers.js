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

var changeZerosToFalse = function(arr){
  return arr.map(function(prevVal, curVal, idx, ar){
    return prevVal == 0 ?
      false:
      true;
  });
}

var findModulesInArray = function(arr, name){
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].name === name) {
      return arr[i];
    }
  };
  return false;
}

/**
 * Tries to Parse JSON
 * @param  {String} jsonString String to Parse
 * @return {boolean}            false if cannot parse
 * @return {object}             the parsed JSON Object
 *
 * @copied from: http://stackoverflow.com/a/20392392/1306046
 */
var tryParseJSON = function (jsonString) {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object",
        // so we must check for that, too.
        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    }
    catch (e) { }

    return false;
};

module.exports.mapMultipleArrayToObj = mapMultipleArrayToObj;
module.exports.mapArrayToArrayUsingObj = mapArrayToArrayUsingObj;
module.exports.changeZerosToFalse = changeZerosToFalse;
module.exports.tryParseJSON = tryParseJSON;