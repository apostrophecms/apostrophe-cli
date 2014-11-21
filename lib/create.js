var config = require('../config.js');

module.exports = function (args) {

	if (exec('git clone ' + config.APOSTROPHE_BOILERPLATE + ' ' + args[0]).code !== 0) {
	  return false;
	} else {
    return true;
	}
}