function getEnvConfig() {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '3000',
    API_KEY: process.env.API_KEY || 'default_key',
  };
}

module.exports = { getEnvConfig };
