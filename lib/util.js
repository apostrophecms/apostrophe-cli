/* eslint-disable no-console */
require('shelljs/global');
// Utilities from shelljs
/* globals exit which */
var fs = require('fs');
var util = {};
var _ = require('lodash');

module.exports = util;

var prefix = function (color) {
  color = color || 'red';

  return ' Apostrophe '.bgWhite[color].bold;
};

util.styleCommand = function(commandName) {
  return ' '.bgRed + commandName.bgRed.white + ' '.bgRed;
};

util.nlog = function(commandName, message) {
  console.log(' ');
  console.log(prefix() + util.styleCommand(commandName) + ' ' + message);
};

util.success = function(commandName) {
  console.log(' ');
  console.log(prefix() + util.styleCommand(commandName) + ' Finished successfully.'.green);
};

util.error = function(commandName) {
  console.log(' ');
  console.log(prefix() + util.styleCommand(commandName) + ' Failed'.red);
};

util.notValid = function(commandName) {
  console.log(' ');
  console.log(prefix() + ' Not a valid command'.red);
};

util.deprecated = function () {
  const depPrefix = prefix('black');
  console.log(' ');
  console.log(depPrefix + ' This version of the ApostropheCMS CLI is deprecated.'.bgCyan);
  console.log(depPrefix + ' Please uninstall and install the new version with:'.bgCyan);
  console.log(depPrefix + ' `npm un -g apostrophe-cli && npm i -g @apostrophecms/cli`'.bgCyan);
};

util.isWindows = (require('os').platform() === 'win32');

util.missingDependency = function(dependencyName) {
  console.log(' ');
  console.log(dependencyName + ' not found'.red);
  console.log('Please install missing dependency'.red);
};

util.checkDependencies = function() {
  var config = require('../config');

  for (var i in config.SHELL_DEPENDS) {
    var dep = config.SHELL_DEPENDS[i];
    if (!which(dep)) {
      util.missingDependency(dep);
      exit(1);
    }
  }
};

util.getAppPath = function(path) {
  path = path || './';
  if (fs.existsSync(path + '/app.js')) {
    return path;
  } else {
    var rootPath = /\/$/;
    // In case of windows, top level directory is some variation on C:\
    if (util.isWindows) {
      rootPath = /([A-Z]):\\$/;
    }
    if (fs.realpathSync(path).match(rootPath)) {
      // we've reached top level folder, no app.js
      util.error('Unable to locate an app.js in this directory. You need to be in the root directory of an Apostrophe project to run this command.');
      return null;
    }
    return util.getAppPath(path + '../');
  }
};

util.titleCase = function(string) {
  return string.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Replace the given regexp with the given replacement in all of the files in the given array.
// As always, if you want global replace within the file, use `/g`

util.replaceInFiles = function(files, regex, replacement) {
  _.each(files, function(file) {
    var content = fs.readFileSync(file, 'utf8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
  });
};

util.secret = function() {
  var bytes = require('crypto').randomBytes(8);
  var string = '';
  var i;
  for (i = 0; (i < bytes.length); i++) {
    var s = bytes[i].toString(16);
    if (s.length < 2) {
      s = '0' + s;
    }
    string += s;
  }
  return string;
};
