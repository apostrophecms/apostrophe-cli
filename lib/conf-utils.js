const confUtils = {};
const prompts = require('prompts');
const Conf = require('conf');
const { v4: uuidv4 } = require('uuid');

const conf = new Conf({
  configName: 'Apostrophe CLI',
  projectName: 'apostrophe-cli',
  projectSuffix: '',
  schema: {
    uid: {
      type: 'string'
    },
    enableAnalytics: {
      type: 'boolean',
      default: false
    },
    prompted: {
      type: 'boolean',
      default: false
    }
  }
});

module.exports = confUtils;

confUtils.getConf = function (propertyName) {
  return conf.get(propertyName);
};

confUtils.checkConf = async function () {
  let details = conf.store;

  if (!details.prompted) {
    details = await askPermission();
  }

  return details;
};

async function askPermission () {
  // eslint-disable-next-line no-console
  console.info('\n👋 It looks like this might be your first time using the Apostrophe CLI on this computer.\n');
  const response = await prompts({
    type: 'confirm',
    name: 'enableAnalytics',
    message: 'Would you be willing to share basic, anonymous usage information with us? (This will have no effect on what you can do with the CLI)'
  });

  const uid = uuidv4();
  conf.set('prompted', true);
  conf.set('uid', uid);

  if (response.enableAnalytics === true) {
    conf.set('enableAnalytics', true);
  }

  return conf.store;
}