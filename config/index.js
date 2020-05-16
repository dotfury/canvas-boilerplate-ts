const convict = require('convict');
const yaml = require('js-yaml');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['develop', 'staging', 'production'],
    default: 'develop',
    env: 'NODE_ENV'
  },
  aws: {
    bucket: {
      format: String,
      default: ''
    },
    accessId: {
      format: String,
      default: '',
      env: 'AWS_ACCESS_KEY_ID'
    },
    accessSecret: {
      format: String,
      default: '',
      env: 'AWS_SECRET_ACCESS_KEY'
    },
    accountId: {
      format: String,
      default: ''
    }
  },
  client: {}
});

// Load environment dependent configuration
const env = config.get('env');
convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.safeLoad });
config.loadFile(`./config/${env}.yml`);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
