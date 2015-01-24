var basicOperations = require('./basic_op.js');
var Exceptions = require('./exceptions.js');
var helpers = require('./helpers.js');
var loader = require('./loader.js');
//Debug
var util = require('util');

//A Function that processes(or simulates) an module with given inputs
//for given time
//TODO: Generate array of outputs until some time
//Example: If the maximum delay is 5s, then given
//resolution of 1s. Give the outputs for each second
//{"1":{output},
//"2":{output},
//...
//"5":{output}}
//
var doProcess = function (object, inputs, resolution) {
  //TODO: Check if object is good.
  console.log("Mod::: "+ object.name);
  console.log(
    'Starting Parse :: Module: ' + object.name + ' with ' +
    object.inputs.length + ' inputs and ' + object.operations.length +
    ' operation(s)'
  );
  var variables = helpers.mapMultipleArrayToObj([
    object.inputs,
    object.outputs,
    object.wires
  ]);
  console.log(util.inspect(variables, false, null)); //Debug

  //Assign Inputs
  for (var i = inputs.length - 1; i >= 0; i--) {
    variables[object.inputs[i]] = inputs[i];
  };

  object.operations.forEach(function operate (currVal, idx, arr) {
    if (currVal.type === 'basic') {
      if (currVal.outputs.length > 1) {
        throw new Exceptions.OutputLengthErrorException("Output cannot be more"+
          "than one!"
        );
      }
      variables[currVal.outputs[0]] = basicOperations[currVal.instance](
        helpers.mapArrayToArrayUsingObj(currVal.inputs, variables));
    } else {
      //Operations are not basic:
      //Might need recursion
      //STEPS:
      //Load the instances using loader
      //Pass the object returned by loader to c this function.
      //Map to appropriate input/output/wires
      console.log("Calling loader with "+ currVal.instance);
      var objData = loader.load(currVal.instance);
      doProcess(objData, helpers.mapArrayToArrayUsingObj(currVal.inputs, variables));
    }
  });
  return variables;
}

module.exports.doProcess = doProcess;