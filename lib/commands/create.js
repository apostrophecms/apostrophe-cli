require('shelljs/global');
var replace = require('replace');
var prompt = require('prompt');
var util = require('../util');
var config = require('../../config');

module.exports = function (program) {
  var self = this;

  program
    .command('create <projectTitle>')
    .description('Create a boilerplate Apostrophe 2.x project')
    .option('--setup', 'Will setup the project further by installing dependencies and creating an admin user')
    .option('--boilerplate [url]', 'Use a custom boilerplate to create the project with')
    .action(function(projectTitle, options) {
      var count = (options.install || options.setup) ? 5 : 2;
      var boilerplateUrl = (options.boilerplate) ? options.boilerplate : config.APOSTROPHE_BOILERPLATE;

      util.nlog('create', 'Grabbing the boilerplate from Github [1/'+count+']' );
      // clone the sandbox project
      if (exec('git clone ' + boilerplateUrl + ' ' + projectTitle).code !== 0) {
        util.error('create');
        return false;
      }

      cd(projectTitle);

      // remove the .git directory to disassociate the project with the sandbox
      rm('-rf', '.git/');
      util.nlog('create', 'Setting up your project name [2/'+count+']' );
      // do some token replaces to rename the apostrophe project
      replaceInConfig(/[Aa]postrophe[\s\-][Bb]oilerplate/g, projectTitle);
      // remove the now irrelevant git path
      replaceInConfig("https:\\/\\/github.com\\/punkave\\/apostrophe-boilerplate", "");

      // if we catch an install flag, do some stuff
      if (options.install || options.setup){
        util.nlog('create', 'Creating your local data file [3/'+count+']');
        mkdir('-p', 'data/');
        cp('local.example.js', 'data/local.js');
        rm('local.example.js');
        replaceInData(/[Aa]postrophe[\s\-][Ss]andbox/g, projectTitle);
        util.nlog('create', 'Installing all dependencies [4/'+count+']');
        exec('npm install');
        // Create an admin user (note this will prompt for password)
        util.nlog('create', 'Creating an admin user [5/5]');
        util.nlog('create', 'Choose a password for the admin user');
        prompt.start();
        prompt.get({
          properties: {
            password: {
              required: true,
              hidden: true
            }
          }
        }, function(err, result) {
          if (err) {
            util.error('create');
            return false;
          }
          exec('echo "' + result.password + '" | node app.js apostrophe-users:add admin admin');
          util.nlog('create', 'Login as "admin"');
          util.success('create');
          return true;
        });
      }
    });
}

function replaceInConfig(regex, replacement) {
  replace({
    regex: regex,
    replacement: replacement,
    paths: ['./app.js', './package.json'],
    silent: true
  });
}

function replaceInData(regex, replacement) {
  replace({
    regex: regex,
    replacement: replacement,
    paths: ['./data/local.js'],
    silent: true
  });
}
