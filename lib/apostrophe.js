require('shelljs/global');
// Utilities from shelljs
/* globals exec */
var util = require('./util');

function getCommand(command) {
  var defaultNamespace = 'apostrophe:';
  var namespaced = false;

  [':', '.'].forEach(function(token) {
    if (command.split(token).length > 1) {
      namespaced = true;
    }
  });

  if (!namespaced) {
    command = defaultNamespace + command;
  }

  return command;
}

module.exports = function (program) {
  program
    .command('*')
    .usage('<commandName>')
    .description('Run an Apostrophe task, possibilities listed below')
    .action(function(commandName, options) {
      util.nlog(commandName, 'Running the task [1/1]');

      var appPath = util.getAppPath();
      var command = getCommand(commandName);

      if (appPath) {
        if (exec('node ' + appPath + '/app.js ' + command).code !== 0) {
          util.error(commandName);
          return false;
        }
      } else {
        return false;
      }

      util.success(commandName);
      return true;
    });

  var retVal = {};

  retVal.help = function() {
    var appPath = util.getAppPath();

    if (appPath) {
      console.log('  Apostrophe Tasks:');
      exec('node ' + appPath + '/app.js apostrophe:tasks');
    }
  };

  return retVal;
};
