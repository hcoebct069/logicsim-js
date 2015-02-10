##Building Instructions

Open loader.js and change `require('fs')` to `require('browserify-fs')` .

Then

```bash
$ browserify browserify_entry.js --standalone LogicSim -o ../build/logicsim-0.2.js
```
Then include `logicsin-0.2.js` in your html.

##Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LogicSim JS 0.2</title>
</head>
<body>[]
    Check Console
    <button onclick="appendData();">Add Sample Data to current FileSystem</button>
    <button onclick="doProcess();">Do the process!</button>
</body>
<script src="../../build/logicsim-0.2.js" type="text/javascript"></script>
<script type="text/javascript">
    var loader  = LogicSim.loader;
    var process = LogicSim.process;
    function doProcess(){
    var data = loader.load("adder", function (err, data) {
      if (err){
        console.log("Oops! Erro!");
        console.log(data);
      } else {
        process.doProcess(data, [true, false, true], function(error, output){
          if (error === true) {
            console.log("Oops! Error!");
            console.log(output);
          } else {
            console.log(output);
          }
        });
      }
    });
  }

  function appendData(){
    var fs = loader.fs;
    fs.mkdir('./example_modules', function(e,d){
      console.log("DIR Error: Means it's already there if not undefined " + e); console.log("Dir Data?" + d);
      fs.writeFile('./example_modules/adder.mod', '{ "name": "fulladder", "inputs": [ "A", "B", "Ci" ], "outputs": [ "S", "Co" ], "wires": [ "w1", "w2", "w3" ], "operations": [ { "instance": "basic_xor", "type": "basic", "inputs": [ "A", "B", "Ci" ], "outputs": [ "S" ] }, { "instance": "basic_and", "type": "basic", "inputs": [ "A", "B" ], "outputs": [ "w1" ] }, { "instance": "basic_and", "type": "basic", "inputs": [ "Ci", "A" ], "outputs": [ "w2" ] }, { "instance": "basic_and", "type": "basic", "inputs": [ "Ci", "B" ], "outputs": [ "w3" ] }, { "instance": "basic_or", "type": "basic", "inputs": [ "w1", "w2", "w3" ], "outputs": [ "Co" ] } ] }',
      function(e,d){
        console.log("FILE Error: Could mean it's already there if not undefined" + e);
        console.log("file Data? Maybe? "+d);
      });
    });
  }
</script>
</html>
```