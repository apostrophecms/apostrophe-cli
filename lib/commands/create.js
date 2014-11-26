var config = require('../../config.js');
require('shelljs/global');
require('colors');
var prefix = ' Apostrophe '.bgWhite.red.bold + ' create '.bgRed.white + " ";

module.exports = function (args) {
  var projectTitle = args[0];
  var flag = args[1];
  var count = (args.length > 1) ? 5 : 2;
  console.log(' ')
  console.log(prefix + 'Grabbing the boilerplate from Github'.white + ' [1/'+count+']' )
  // clone the sandbox project
  if (exec('git clone ' + config.APOSTROPHE_BOILERPLATE + ' ' + projectTitle).code !== 0) {
    return false;
  }

  cd(projectTitle);

  // remove the .git directory to disassociate the project with the sandbox
  rm('-rf', '.git/');
  console.log(' ')
  console.log(prefix + 'Setting up your project name'.white + ' [2/'+count+']' );
  // do some token replaces to rename the apostrophe project
  exec('sed -i \'\' -e \'s:apostrophe-boilerplate:' + projectTitle + ':g\' app.js > /dev/null');
  exec('sed -i \'\' -e \'s:Apostrophe Boilerplate:' + projectTitle + ':g\' app.js > /dev/null');
  // remove now irrelavent git path
  exec('sed -i \'\' -e \'s/https:\\/\\/github.com\\/punkave\\/apostrophe-boilerplate//g\' package.json > /dev/null');
  exec('sed -i \'\' -e \'s:apostrophe-boilerplate:' + projectTitle + ':g\' package.json > /dev/null');

  // if we catch an install flag, do some stuff
  if (flag === '--install'){
    console.log(' ');
    console.log(prefix + 'Creating your local data file'.white + ' [3/'+count+']');
    exec('mkdir data/ && cp local.example.js data/local.js && rm local.example.js');
    console.log(' ');
    console.log(prefix + 'Installing all dependencies'.white + ' [4/'+count+']');
    exec('npm install');
    //Can I just call this from another module?
    console.log(' ');
    console.log(prefix + 'Resetting your database'.white + ' [5/'+count+']');
    exec('node app apostrophe:reset');
  }

  return true;
}
