var config = require('../../config.js');
require('shelljs/global');
require('colors');
var prefix = ' Apostrophe '.bgWhite.red.bold;

module.exports = function (args) {
	console.log(' ');
	console.log(prefix + ' '.bgRed + args[0].bgRed.white + ' '.bgRed + ' Running the task'.white + ' [1/1]');

	if (exec('node app apostrophe:' + args[0]).code !== 0) {
	  return false;
	}
	console.log(' ');

  return true;
}
