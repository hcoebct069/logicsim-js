var basicOperations = require('./basic_op.js');
var Exceptions = require('./exceptions.js');
var helpers = require('./helpers.js');
var loader = require('./loader.js');
//Debug
var util = require('util');
/*
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
var doProcess = function (object, inputs, resolution, callback) {
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
  //callback(variables);
  return variables;
}*/

//module.exports.doProcess = doProcess;

/*function objInternalInstanceConstructor(identifier){
  this.id = identifier;
}*/

// function objInternalInstance(identifier){
//   this.id = identifier;
// }

// objInternalInstance.returnOutputs = null;
// objInternalInstance.variables = null ;
/*var objInteralInstance = {

  constructor: objInternalInstanceConstructor,

  returnOutputs: null,
  variables: null

};*/

module.exports.doProcess  = function proc (object, inputs, callback){
  //var currentObjInstance = new objInternalInstance(object.name);
  var returnOutputs = [];
  //currentObjInstance.returnWires = {};
  var variables = helpers.mapMultipleArrayToObj([
    object.inputs,
    object.outputs,
    object.wires
  ]);

  //parentInstance = parentInstance || false;

  //console.log("Inputs given in " + object.name + " : " +inputs);
  //console.log("Real Inputs: " + object.inputs)
  if(inputs.length !== object.inputs.length) {
    callback(true, {msg:"Input Length Mismatch"});
  }

  //Assign Inputs to currentObjInstance
  for (var i = inputs.length - 1; i >= 0; i--) {
    /*currentObjInstance.*/variables[object.inputs[i]] = inputs[i];
  };

  var that = this;
  object.operations.forEach(function (currentValue, index, arr) {
    //console.log(variables);
    if (currentValue.type === 'basic') {
      if(currentValue.outputs.length > 1){
        var e_msg = parentInstance === false ?
         "Error in Operation: " + currentValue.instance +
         "More than one output specified." :
         "Error in Operation: " + currentValue.instance +
         "Called From: " + parentInstance.identifier;
        callback(true, {msg:e_msg});
      } else {
        /*currentObjInstance.*/variables[currentValue.outputs[0]] =
         basicOperations[currentValue.instance](
          helpers.mapArrayToArrayUsingObj(currentValue.inputs,
            /*currentObjInstance.*/variables));
         if(index === arr.length - 1){
                //console.log(variables);
                //console.log(variables)
                callback(false, returnOutputArrayVal(object.outputs, variables));
        }
      }
    } else { /* if not basic */
      loader.load(currentValue.instance, function (err, data) {
        if(err){
          callback(true, {msg:"Cannot Load Module" + currentValue.instance});
        } else {
          //Yay! Data
          //console.log(data);
          proc(data, helpers.mapArrayToArrayUsingObj(currentValue.inputs,
            /*currentObjInstance.*/variables),
            function (error, output) {
              if(error === true){
                callback(true, {msg:"Error processing: "+currentValue.instance,
                 error_details:output});
              } else {
                //Yay!
                //Output returns array?single
                //if(currentObjInstance.returnOutputs)
                //console.log("This:" +output);
                for (var i = currentValue.outputs.length - 1; i >= 0; i--) {
                  variables[currentValue.outputs[i]] = output[i]
                };
                //console.log(currentValue);
                if(index === arr.length - 1){
                  //console.log(variables);
                  //console.log(variables)
                  callback(false, returnOutputArrayVal(object.outputs, variables));
                }
              }
            });
        }
      })
    }
  });
}


function returnOutputArrayVal(objOutputArray, variables){
  var rO = [];
  for (var j = objOutputArray.length - 1; j >= 0; j--) {
    rO[j] = variables[objOutputArray[j]];
  };
  return rO;
}
