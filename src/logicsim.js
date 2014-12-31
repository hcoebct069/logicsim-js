var process = require('./process.js');

//TEST STARTS HERE

var objTest = {
  name:'and3',
  inputs:['a', 'b', 'c'],
  outputs:['y'],
  wires:['w1','w2'],
  operations : [{instance:'basic_and', type: 'basic', inputs:['a', 'b'], output:['w1']},
  {instance:'basic_or',type:'basic', inputs:['w1','c'], output:['w2']},
  {instance:'basic_not', type:'basic', inputs:['w2'], output:['y']}]
};

var a = [[1,1,0],[0,0,1], [1,0,0]];
for (var i = a.length - 1; i >= 0; i--) {
  a[i] = process.helpers.changeZerosToFalse(a[i]);
};

console.log("Check: ")
console.log(process.util.inspect(a, false, null));
var objOut = process.doProcess(objTest, [true, true, true]);
console.log(process.util.inspect(objOut, false, null)); //Debug