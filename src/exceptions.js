var Exceptions = {
  InputLengthErrorException: function (message){
    this.InputLengthErrorException.message = message;
    this.InputLengthErrorException.type = "InputLengthErrorException";
  },
  OutputLengthErrorException: function (message) {
    this.OutputLengthErrorException.message = message;
    this.OutputLengthErrorException.type = "OutputLengthErrorException";
  },
  VariableNotFoundException: function (message) {
    this.VariableNotFoundException.message = message;
    this.VariableNotFoundException.type = "VariableNotFoundException";
  }

};

module.exports = Exceptions;