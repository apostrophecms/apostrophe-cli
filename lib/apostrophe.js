require('shelljs/global');
var fs = require('fs');

var config = require('../config.js');
var util = require('./util');

function getAppPath(path) {
  path = path || './';
  if (fs.existsSync(path + '/app.js')) {
    return path;
  } else {
    if (fs.realpathSync(path) == '/') {
      // we've reached top level folder, no app.js
      console.log('  Not in apostrophe project, cannot run node app apostrophe: tasks');
      return null;
    }
    return getAppPath(path + '../');
  }
}

module.exports = function (program) {
  program
    .command('*')
    .usage('<commandName>')
    .description('Run an Apostrophe task, possibilities listed below')
    .action(function(commandName, options) {
      util.nlog(commandName, 'Running the task [1/1]');

      var appPath = getAppPath();

      if (appPath) {
        if (exec('node ' + appPath + '/app.js apostrophe:' + commandName).code !== 0) {
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
    var appPath = getAppPath();

    if (appPath) {
      console.log('  Apostrophe Tasks:');
      exec('node ' + appPath + '/app.js apostrophe:tasks');
    }
  }

  return retVal;
}