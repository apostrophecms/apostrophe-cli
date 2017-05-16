require('shelljs/global');
var replace = require('replace');
var prompt = require('prompt');
var fs = require('fs');
var util = require('../util');
var config = require('../../config');

module.exports = function (program) {
  var self = this;

  program
    .command('create-module <module name>')
    .description('Bootstrap a subclass of apostrophe-module with all the configuration you need to get started')
    .action(function(moduleName, options) {
      if(!util.getAppPath()) {
        return false;
      }

      util.nlog('create-module', 'Adding '+ moduleName + ' folder to /lib/modules.');

      var path = 'lib/modules/'+moduleName;

      mkdir('-p', path);

      var moduleConfig = "module.exports = {\
        \n   extend: 'apostrophe-module',\
        \n   label: '" + util.titleCase(moduleName.replace(/-/g, ' ')) +"',\
        \n   construct: function(self, options, callback) {\
        \n\
        \n   }\
        \n};";

      util.nlog('create-module', 'Setting up index.js for '+ moduleName +'.');
      fs.writeFileSync(path + '/index.js', moduleConfig);

      util.success('create-module');
      return true;
    });
};
