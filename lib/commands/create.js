require('shelljs/global');
// Utilities from shelljs
/* globals exec cd rm */
var prompts = require('prompts');
var util = require('../util');
var config = require('../../config');
var fs = require('fs');

module.exports = function (program) {
  program
    .command('create-project <shortname-without-spaces>')
    .description('Create a boilerplate Apostrophe 2.x project')
    .option('--setup', 'Will setup the project further by installing dependencies and creating an admin user')
    .option('--boilerplate [url]', 'Use a custom boilerplate to create the project with')
    .action(async function(shortName, options) {
      var count = (options.install || options.setup) ? 3 : 2;
      var boilerplateUrl = (options.boilerplate) ? options.boilerplate : config.APOSTROPHE_BOILERPLATE;

      util.nlog('create-project', 'Grabbing the boilerplate from Github [1/' + count + ']');
      // clone the sandbox project
      if (exec('git clone ' + boilerplateUrl + ' ' + shortName).code !== 0) {
        util.error('create-project');
        return false;
      }

      cd(shortName);

      // remove the .git directory to disassociate the project with the sandbox
      rm('-rf', '.git/');
      util.nlog('create-project', 'Setting up your project shortname [2/' + count + ']');
      // do some token replaces to rename the apostrophe project
      replaceInConfig(/apostrophe-boilerplate|apostrophe-open-museum/g, shortName);

      // Session secret
      var secret = util.secret();
      if (fs.existsSync('./lib/modules/apostrophe-express/index.js')) {
        util.replaceInFiles(['./lib/modules/apostrophe-express/index.js'], /secret: undefined/, 'secret: \'' + secret + '\'');
      }
      // disabledKey for uploadfs
      secret = util.secret();
      util.replaceInFiles(['./app.js'], /disabledFileKey: undefined/, 'disabledFileKey: \'' + secret + '\'');
      // if we catch an install flag, do some stuff
      if (options.install || options.setup) {
        // update, not install, so package-lock.json gets updated
        // & we're not married to a very old version of Apostrophe
        exec('npm update --dev');
        // Create an admin user (note this will prompt for password)
        util.nlog('create-project', 'Creating an admin user [3/3]');
        util.nlog('create-project', 'Choose a password for the admin user');

        const response = await prompts({
          type: 'password',
          name: 'pw',
          message: '🔏 Please enter a password:'
        });

        exec('echo "' + response.pw + '" | node app.js apostrophe-users:add admin admin');
        util.nlog('create', 'Login as "admin"');
      }

      util.success('create-project');
      return true;
    });
};

function replaceInConfig(regex, replacement) {
  util.replaceInFiles(['./app.js', './package.json'], regex, replacement);
}
