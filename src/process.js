var basicOperations = require('./basic_op.js');
var Exceptions = require('./exceptions.js');
var helpers = require('./helpers.js');
var util = require('util');

//A Function that processes(or simulates) an module with given inputs
//for given time 
var doProcess = function (object, inputs, time, delay) {
  //TODO: Check if object is good. 
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
  console.log(util.inspect(variables, false, null));

  //Assign Inputs
  for (var i = inputs.length - 1; i >= 0; i--) {
    variables[object.inputs[i]] = inputs[i];
  };

  object.operations.forEach(function operate (currVal, idx, arr) {
    if (currVal.type === 'basic') {
      if (currVal.output.length > 1) {
        throw new Exceptions.OutputLengthErrorException("Output cannot be more"+
          "than one!"
        );
      }hthttps://stackoverflow.com/questions/10729276/node-js-console-log-object-contenthttps://stackoverflow.com/questions/10729276/node-js-console-log-object-contenttps://stackoverflow.com/questions/10729276/node-js-console-log-object-content
      variables[currVal.output[0]] = basicOperations[currVal.instance](
        helpers.mapArrayToArrayUsingObj(currVal.inputs, variables));
    } else {
      //Operations are not basic:
      //Might need recursion.
    }
  });
  return variables;
}

var objTest = {
  name:'name',
  inputs:['a', 'b', 'c'],
  outputs:['y'],
  wires:['w1','w2'],
  operations : [{instance:'basic_and', type: 'basic', inputs:['a', 'b'], output:['w1']},
  {instance:'basic_or',type:'basic', inputs:['w1','c'], output:['w2']},
  {instance:'basic_not', type:'basic', inputs:['w2'], output:['y']}]
};

var objOut = doProcess(objTest, [true, true, true]);
console.log(util.inspect(objOut, false, null));