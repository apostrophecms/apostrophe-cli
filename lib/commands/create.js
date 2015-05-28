require('shelljs/global');
var replace = require('replace');
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
      replaceInConfig(/[Aa]postrophe[\s\-][Bb]oilerplate/g, projectTitle);
      // remove the now irrelevant git path
      replaceInConfig("https:\\/\\/github.com\\/punkave\\/apostrophe-boilerplate", "");

      // if we catch an install flag, do some stuff
      if (options.install){
        util.nlog('create', 'Creating your local data file [3/'+count+']');
        mkdir('-p', 'data/');
        cp('local.example.js', 'data/local.js');
        rm('local.example.js');
        replaceInData(/[Aa]postrophe[\s\-][Ss]andbox/g, projectTitle);
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
