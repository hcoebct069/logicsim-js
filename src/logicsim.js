var process = require('./process.js');
var loader = require('./loader.js');
//TEST STARTS HERE

/*var newObj = {
  name:"custom1",
  inputs:['a','b'],
  outputs:['y'],
  wires:['w1']
  operations:[{instance:'basic_not', type:'basic', inputs:['a'], outputs:['w1']},
  {instance:'custom1', type:'not_basic',inputs:['a','b','w1'], outputs:['y']}]
};


var objTest = {
  name:'custom1',
  inputs:['a', 'b', 'c'],
  outputs:['y'],
  wires:['w1','w2'],
  operations : [{instance:'basic_and', type: 'basic', inputs:['a', 'b'], outputs:['w1']},
  {instance:'basic_or',type:'basic', inputs:['w1','c'], outputs:['w2']},
  {instance:'basic_not', type:'basic', inputs:['w2'], outputs:['y']}]
};


// loader.load("adder", function(object){
//   console.log(object);
// });

var a = [[1,1,0],[0,0,1], [1,0,0]];
for (var i = a.length - 1; i >= 0; i--) {
  a[i] = process.helpers.changeZerosToFalse(a[i]);
};

console.log("Check: ")
console.log(process.util.inspect(a, false, null));
var objOut = process.doProcess(objTest, [true, true, true]);
console.log(process.util.inspect(objOut, false, null)); //Debug*/

/*var data = loader.load("custom");
var objOut = process.doProcess(data, [true, true, true]);
console.log("++++++++++++++++++++++++++++++++++++++++++");
console.log(process.util.inspect(objOut, false, null)); //Debug
module.exports = process;*/

var data = loader.load("custom", function (err, data) {
  if (err){
    console.log("Oops! Erro!");
    console.log(data);
  } else {
    //do stuffs
    process.doProcess(data, [true, false, true], function(error, output){
      //output contains output of the module
      //wires contain the value of all wires in the module --> Hold it now
      if (error === true) {
        console.log("Oops! Error!");
        console.log(output);
      } else {
        console.log(output);
      }
    })
  }
});