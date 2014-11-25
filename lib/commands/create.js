var config = require('../../config.js');
require('shelljs/global');

module.exports = function (args) {
  var projectTitle = args[0];

  // clone the sandbox project
	if (exec('git clone ' + config.APOSTROPHE_BOILERPLATE + ' ' + projectTitle).code !== 0) {
	  return false;
	}

  cd(projectTitle);

  // remove the .git directory to disassociate the project with the sandbox
  rm('-rf', '.git/');

  // do some token replaces to rename the apostrophe project
  exec('sed -i \'\' -e \'s:apostrophe-boilerplate:' + projectTitle + ':g\' app.js > /dev/null');
  exec('sed -i \'\' -e \'s:apostrophe-boilerplate:' + projectTitle + ':g\' package.json > /dev/null');
  
  return true;
}