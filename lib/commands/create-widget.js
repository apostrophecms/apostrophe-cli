require('shelljs/global');
// Utilities from shelljs
/* globals mkdir exec */
var fs = require('fs');
var util = require('../util');

module.exports = function (program) {
  program
    .command('create-widget <widget-name>')
    .option('--player', 'Also add a public/js folder to your new apostrophe-widgets module directory with an always.js set up with an apostrophe player.')
    .description('Bootstrap a subclass of apostrophe-widgets with all the configuration you need to get started')
    .action(function(widgetName, options) {
      if (!util.getAppPath()) {
        return false;
      }

      util.nlog('create-widget', 'Adding ' + widgetName + '-widgets folder to /lib/modules.');

      var fullWidgetName = widgetName + '-widgets';
      var path = 'lib/modules/' + fullWidgetName;

      mkdir('-p', path);

      util.nlog('create-widget', 'Creating a views folder and widget.html for ' + fullWidgetName + '.');
      mkdir('-p', path + '/views');
      exec('touch ' + path + '/views/widget.html');

      var widgetConfig = `
      module.exports = {
        extend: 'apostrophe-widgets',
        label: '${util.titleCase(widgetName.replace(/-/g, ' '))}',
        addFields: []
      };`;

      util.nlog('create-widget', 'Setting up index.js for ' + fullWidgetName + '.');
      fs.writeFileSync(path + '/index.js', widgetConfig);

      if (options.player) {
        util.nlog('create-widget', 'Setting up always.js for ' + widgetName + fullWidgetName + '.');
        mkdir('-p', path + '/public/js');

        var jsConfig = `
        apos.define('${fullWidgetName}', {
          extend: 'apostrophe-widgets',
          construct: function(self, options) {
            self.play = function($widget, data, options) {

            };
          }
        });`;

        fs.writeFileSync(path + '/public/js/always.js', jsConfig);
      }

      util.success('create-widget');
      return true;
    });
};
