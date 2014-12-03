require('shelljs/global');
var config = require('../config.js');
var util = require('./util');

module.exports = function (program) {
  program
    .command('*')
    .usage('<commandName>')
    .description('Run an Apostrophe task, possibilities listed below')
    .action(function(commandName, options) {
      util.nlog(commandName, 'Running the task [1/1]');

      if (exec('node app apostrophe:' + commandName).code !== 0) {
        util.error(commandName);
        return false;
      }

      util.success(commandName);
      return true;
    });

  var retVal = {};

  retVal.help = function() {
    console.log('  Apostrophe Tasks:');
    exec('node app apostrophe:tasks');
  }

  return retVal;
}