require('shelljs/global');
var util = require('../util');
var config = require('../../config');

module.exports = function (program) {
  var self = this;

  program
    .command('create <projectTitle>')
    .description('Create a boilerplate apostrophe project')
    .option('--install', 'Will install dependencies after creating boilerplate')
    .action(function(projectTitle, options) {
      var count = (options.install) ? 5 : 2;
      util.nlog('create', 'Grabbing the boilerplate from Github [1/'+count+']' );
      // clone the sandbox project
      if (exec('git clone ' + config.APOSTROPHE_BOILERPLATE + ' ' + projectTitle).code !== 0) {
        util.error('create');
        return false;
      }

      cd(projectTitle);

      // remove the .git directory to disassociate the project with the sandbox
      rm('-rf', '.git/');
      util.nlog('create', 'Setting up your project name [2/'+count+']' );
      // do some token replaces to rename the apostrophe project
      exec('sed -i \'\' -e \'s:apostrophe-boilerplate:' + projectTitle + ':g\' app.js > /dev/null');
      exec('sed -i \'\' -e \'s:Apostrophe Boilerplate:' + projectTitle + ':g\' app.js > /dev/null');
      // remove now irrelavent git path
      exec('sed -i \'\' -e \'s/https:\\/\\/github.com\\/punkave\\/apostrophe-boilerplate//g\' package.json > /dev/null');
      exec('sed -i \'\' -e \'s:apostrophe-boilerplate:' + projectTitle + ':g\' package.json > /dev/null');

      // if we catch an install flag, do some stuff
      if (options.install){
        util.nlog('create', 'Creating your local data file [3/'+count+']');
        exec('mkdir data/ && cp local.example.js data/local.js && rm local.example.js');
        util.nlog('create', 'Installing all dependencies [4/'+count+']');
        exec('npm install');
        //Can I just call this from another module?
        util.nlog('create', 'Resetting your database [5/'+count+']');
        exec('node app apostrophe:reset');
      }

      util.success('create');
      return true;
    });
}
