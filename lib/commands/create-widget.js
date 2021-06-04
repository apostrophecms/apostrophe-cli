require('shelljs/global');
// Utilities from shelljs
/* globals mkdir exec */
const fs = require('fs');
const util = require('../util');
const { stripIndent } = require('common-tags');

module.exports = function (program) {
  program
    .command('create-widget <widget-type-name>')
    .option('--player', 'Also add a public/js folder to your new apostrophe-widgets module directory with an always.js set up with an apostrophe player.')
    .description('Bootstrap a subclass of apostrophe-widgets with all the configuration you need to get started')
    .action(function(widgetName, options) {
      if (!util.getAppPath('create-widget')) {
        return false;
      }

      util.nlog('create-widget', 'Adding ' + widgetName + '-widgets folder to /lib/modules.');

      const fullWidgetName = widgetName + '-widgets';
      const path = 'lib/modules/' + fullWidgetName;

      mkdir('-p', path);

      util.nlog('create-widget', 'Creating a views folder and widget.html for ' + fullWidgetName + '.');
      mkdir('-p', path + '/views');
      exec('touch ' + path + '/views/widget.html');

      const pushPlayerSnippet = `,
          construct: function (self, options) {
            self.pushAsset('script', 'lean', { when: 'lean' });
          }`;

      const widgetConfig = stripIndent`
        module.exports = {
          extend: 'apostrophe-widgets',
          label: '${util.titleCase(widgetName.replace(/-/g, ' '))}',
          addFields: []${options.player ? pushPlayerSnippet
            : ''}
        };
      `;

      util.nlog('create-widget', 'Setting up index.js for ' + fullWidgetName + '.');
      fs.writeFileSync(path + '/index.js', widgetConfig);

      if (options.player) {
        util.nlog('create-widget', 'Setting up always.js for ' + fullWidgetName + '.');
        mkdir('-p', path + '/public/js');

        const jsConfig = stripIndent`
          apos.utils.widgetPlayers['${widgetName}'] = function(el, data, options) {
            // Lean widget player documentation:
            // https://docs.apostrophecms.org/core-concepts/editable-content-on-pages/custom-widgets.html#adding-a-javascript-widget-player-on-the-browser-side
          };
        `;

        fs.writeFileSync(path + '/public/js/lean.js', jsConfig);
      }

      util.success('create-widget');

      return true;
    });
};
