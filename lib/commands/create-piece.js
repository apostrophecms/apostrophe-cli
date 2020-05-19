require('shelljs/global');
// Utilities from shelljs
/* globals mkdir exec */
var fs = require('fs');
var util = require('../util');

module.exports = function (program) {
  program
    .command('create-piece <SINGULAR-piece-name>')
    .description('Bootstrap a subclass of apostrophe-pieces with all the configuration you need to get started')
    .option('--pages', 'Configure a corresponding apostrophe-pieces-pages module')
    .option('--widgets', 'Configure a corresponding apostrophe-pieces-widgets module')
    .action(function(pieceName, options) {

      if (!util.getAppPath()) {
        return false;
      }

      var moduleName = pieceName + 's';

      util.nlog('create-piece', 'Adding ' + moduleName + ' folder to /lib/modules.');

      var path = 'lib/modules/' + moduleName;

      mkdir('-p', path);

      var pieceConfig = `module.exports = {
  name: '${pieceName}',
  extend: 'apostrophe-pieces',
  label: '${util.titleCase(pieceName.replace(/-/g, ' '))}',
  pluralLabel: '${util.titleCase(pieceName.replace(/-/g, ' '))}s',
  addFields: []
};`;

      util.nlog('create-piece', 'Setting up index.js for ' + moduleName + ' module');
      fs.writeFileSync(path + '/index.js', pieceConfig);

      if (options.pages) {
        util.nlog('create-piece', 'Creating a ' + moduleName + '-pages folder with index.js and appropriate views');

        var pagesConfig = `module.exports = {
  extend: 'apostrophe-pieces-pages',
  label: '${util.titleCase(pieceName.replace(/-/g, ' '))} Page',
  addFields: []
};`;

        mkdir('-p', path + '-pages');
        fs.writeFileSync(path + '-pages/index.js', pagesConfig);

        mkdir('-p', path + '-pages/views');
        exec('touch ' + path + '-pages/views/show.html');
        exec('touch ' + path + '-pages/views/index.html');
        util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + moduleName + '-pages module to "modules" in app.js.');
        util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + pieceName + '-page page type to the "types" array in lib/modules/apostrophe-pages/index.js.');
      }

      if (options.widgets) {
        util.nlog('create-piece', 'Creating a ' + moduleName + '-widgets folder with index.js and appropriate views');

        var widgetsConfig = `module.exports = {
  extend: 'apostrophe-pieces-widgets',
  label: '${util.titleCase(pieceName.replace(/-/g, ' '))} Widget',
  addFields: []
};`;

        mkdir('-p', path + '-widgets');
        fs.writeFileSync(path + '-widgets/index.js', widgetsConfig);

        mkdir('-p', path + '-widgets/views');
        exec('touch ' + path + '-widgets/views/widget.html');
        util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + moduleName + '-widgets module to "modules" in app.js.');
      }
      util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + moduleName + ' module to "modules" in app.js.');

      util.success('create-piece');

      util.sendAnalyticsEvent('create-piece');

      return true;
    });
};
