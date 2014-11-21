var config = require('../../config.js');
require('shelljs/global');

module.exports = function (args) {
	if (exec('npm start apostrophe:' + args[0]).code !== 0) {
	  return false;
	}
  return true;
}