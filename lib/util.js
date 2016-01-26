var util = {};

module.exports = util;

var prefix = ' Apostrophe '.bgWhite.red.bold;

util.styleCommand = function(commandName) {
  return ' '.bgRed + commandName.bgRed.white + ' '.bgRed;
}

util.nlog = function(commandName, message) {
  console.log(' ');
  console.log(prefix + util.styleCommand(commandName) + ' ' + message);
}

util.success = function(commandName) {
  console.log(' ');
  console.log(prefix + util.styleCommand(commandName) +  " Finished successfully.".green);
}

util.error = function(commandName) {
  console.log(' ');
  console.log(prefix + util.styleCommand(commandName) + " Failed".red);
}

util.notValid = function(commandName) {
  console.log(' ');
  console.log(prefix + " Not a valid command".red);
}

util.missingDependency = function(dependencyName) {
  console.log(' ');
  console.log(dependencyName + ' not found'.red);
  console.log('Please install missing dependency'.red)
}

util.checkDependencies = function() {
  var config = require('../config');

  for (var i in config.SHELL_DEPENDS) {
    var dep = config.SHELL_DEPENDS[i];
    if (!which(dep)) {
      util.missingDependency(dep);
      exit(1);
    }
  }
}
