var exceptions = require('./exceptions.js')

var basic_and = function (input) {
  //if input is an array
  return input.reduce (function and_fn (prevValue, curValue, idx, arr) {
    return prevValue && curValue;
  });
}

var basic_or = function (input) {
  //if input is an array
  return input.reduce (function or_fn (prevValue, curValue, idx, arr) {
    return prevValue || curValue ;
  });
}

var basic_not = function (input) {
  if (input.length !== 1) {
    throw new exception("Incorrect Number of Input!");
  }
  return !input;
}

var basic_xor_two = function (a, b) {
  return ( a || b ) && !( a && b );
}

var basic_xor = function(input){
  return input.reduce(function xor_fn(prevValue, curValue, idx, arr){
    return basic_xor_two(prevValue, curValue);
  })
}

module.exports.basic_and = basic_and;
module.exports.basic_or  = basic_or;
module.exports.basic_not = basic_not;
module.exports.basic_xor = basic_xor;