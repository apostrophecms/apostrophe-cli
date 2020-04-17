require('shelljs/global');
var prompt = require('prompt');
var fs = require('fs');
var util = require('../util');
var config = require('../../config');

module.exports = function (program) {
  var self = this;

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

      util.nlog('create-piece', 'Adding '+ moduleName + ' folder to /lib/modules.');

      var path = 'lib/modules/'+moduleName;

      mkdir('-p', path);

      var pieceConfig= "module.exports = {\
        \n  name: '"+ pieceName +"',\
        \n  extend: 'apostrophe-pieces',\
        \n  label: '" + util.titleCase(pieceName.replace(/-/g, ' ')) +"',\
        \n  pluralLabel: '" + util.titleCase(pieceName.replace(/-/g, ' ')) +"s',\
        \n  addFields: []\
        \n};";

      util.nlog('create-piece', 'Setting up index.js for '+ moduleName + ' module');
      fs.writeFileSync(path + '/index.js', pieceConfig);

      if (options.pages) {
        util.nlog('create-piece', 'Creating a '+ moduleName +'-pages folder with index.js and appropriate views');

        var pagesConfig = "module.exports = {\
          \n  extend: 'apostrophe-pieces-pages',\
          \n  label: '" + util.titleCase(pieceName.replace(/-/g, ' ')) +" Page',\
          \n  addFields: []\
          \n};";

        mkdir('-p', path + '-pages');
        fs.writeFileSync(path + '-pages/index.js', pagesConfig);

        mkdir('-p', path + '-pages/views');
        exec('touch ' + path + '-pages/views/show.html');
        exec('touch ' + path + '-pages/views/index.html');
        util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + moduleName + '-pages module to "modules" in app.js.');
        util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + pieceName + '-page page type to the "types" array in lib/modules/apostrophe-pages/index.js.');
      }

      if (options.widgets) {
        util.nlog('create-piece', 'Creating a '+ moduleName +'-widgets folder with index.js and appropriate views');

        var widgetsConfig = "module.exports = {\
          \n  extend: 'apostrophe-pieces-widgets',\
          \n  label: '" + util.titleCase(pieceName.replace(/-/g, ' ')) +" Widget',\
          \n  addFields: []\
          \n};";

        mkdir('-p', path + '-widgets');
        fs.writeFileSync(path + '-widgets/index.js', widgetsConfig);

        mkdir('-p', path + '-widgets/views');
        exec('touch '+ path +'-widgets/views/widget.html');
        util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + moduleName + '-widgets module to "modules" in app.js.');
      }
      util.nlog('create-piece', 'YOUR NEXT STEP: add the ' + moduleName + ' module to "modules" in app.js.');

      util.success('create-piece');
      return true;
    });
};
