require('shelljs/global');
// Utilities from shelljs
/* globals mkdir */
var fs = require('fs');
var util = require('../util');
const { stripIndent } = require('common-tags');

module.exports = function (program) {
  program
    .command('create-module <module-name>')
    .description('Bootstrap a subclass of apostrophe-module with all the configuration you need to get started')
    .action(function(moduleName, options) {
      if (!util.getAppPath('create-module')) {
        return false;
      }

      util.nlog('create-module', 'Adding ' + moduleName + ' folder to /lib/modules.');

      var path = 'lib/modules/' + moduleName;

      mkdir('-p', path);

      var moduleConfig = stripIndent`
        module.exports = {
          extend: 'apostrophe-module',
          label: '${util.titleCase(moduleName.replace(/-/g, ' '))}',
          construct: function(self, options, callback) {

          }
        };
      `;

      util.nlog('create-module', 'Setting up index.js for ' + moduleName + '.');
      fs.writeFileSync(path + '/index.js', moduleConfig);

      util.success('create-module');

      return true;

    });
};
