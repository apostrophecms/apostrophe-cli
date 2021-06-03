/* eslint-disable no-console */
require('shelljs/global');
// Utilities from shelljs
/* globals exit which */
var fs = require('fs');
var util = {};
var _ = require('lodash');
const cliVersion = require('../package.json').version;
const confUtils = require('./conf-utils');
const packageJson = require('package-json');
const semver = require('semver');

module.exports = util;

var prefix = ' Apostrophe '.black.bgWhite.bold;

util.styleCommand = function(commandName, style) {
  const bgStyle = style === 'danger' ? 'bgRed'
    : style === 'success' ? 'bgGreen' : 'bgBlue';
  return ' '[bgStyle] + commandName[bgStyle].white + ' '[bgStyle];
};

util.nlog = function(commandName, message) {
  console.log(' ');
  console.log(prefix + util.styleCommand(commandName) + ' ' + message);
};

util.success = function(commandName) {
  console.log(' ');
  console.log(prefix + util.styleCommand(commandName, 'success') + ' Finished successfully.'.green);

  try {
    checkIfUpdated();
  } catch (error) {
    console.error(error);
  }
};

util.error = function(commandName, msg) {
  console.error(' ');
  console.error(prefix + util.styleCommand(commandName, 'danger') + ' Failed'.red);
  if (msg) {
    console.error('\n' + msg.red + '\n');
  }

  try {
    checkIfUpdated();
  } catch (error) {
    console.error(error);
  }
};

util.notValid = function(commandName) {
  console.log(' ');
  console.log(prefix + ' Not a valid command'.red);
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

util.getAppPath = function(command, path) {
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
      util.error(command, 'Unable to locate an app.js in this directory. You need to be in the root directory of an Apostrophe project to run this command.');
      return null;
    }
    return util.getAppPath(command, path + '../');
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

async function checkIfUpdated () {
  // Get the latest published version number.
  const { version: latest } = await packageJson('apostrophe-cli');

  // Check if they've been notified for this version already. If so, bail out.
  const latestChecked = await confUtils.getConf('versionNotified');
  if (latestChecked && semver.gte(latestChecked, latest)) {
    return;
  }

  // If the local is behind the published version, suggest updating it.
  if (semver.gt(latest, cliVersion)) {
    console.log(`\n🆕 There is an updated version of the apostrophe-cli module. The latest is ${latest}. You are on ${cliVersion}.\nUse \`npm i -g apostrophe-cli\` to get the latest version.`);
  }
  // Stash the last notified version in user conf.
  confUtils.setConf('versionNotified', latest);
}
