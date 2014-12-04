require('shelljs/global');
var fs = require('fs');

var config = require('../config.js');
var util = require('./util');

function appCheck() {
  if (!fs.existsSync('./app.js')) {
    console.log('  Not in proper directory to run node app apostrophe: tasks');
    return false;
  } else {
    return true;
  }
}

module.exports = function (program) {
  program
    .command('*')
    .usage('<commandName>')
    .description('Run an Apostrophe task, possibilities listed below')
    .action(function(commandName, options) {
      util.nlog(commandName, 'Running the task [1/1]');

      if (appCheck()) {
        if (exec('node app apostrophe:' + commandName).code !== 0) {
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
    if (appCheck()) {
      console.log('  Apostrophe Tasks:');
      exec('node app apostrophe:tasks');
    }
  }

  return retVal;
}