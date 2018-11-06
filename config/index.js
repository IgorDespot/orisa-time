require('dotenv').config();

const bunyan = require('bunyan');

const log = {
  development: () => {
    return bunyan.createLogger({ name: 'ORISA-TIME-development', level: 'debug' });
  },
  production: () => {
    return bunyan.createLogger({ name: 'ORISA-TIME-production', level: 'info' });
  },
  test: () => {
    return bunyan.createLogger({ name: 'ORISA-TIME-test', level: 'fatal' });
  }
};

module.exports = {
  googleApiKey: process.env.GOOGLE_GEO_API_KEY,
  log: (env) => {
    if(env)
      return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};