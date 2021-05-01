const env = process.env.NODE_ENV
if(env === 'development' || env === 'test'){
  require('dotenv').config()
}

module.exports = {
  "development": {
    "username": process.env.CONFIG_USERNAME,
    "password": process.env.CONFIG_PASSWORD,
    "database": "invoice_dev",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.CONFIG_USERNAME,
    "password": process.env.CONFIG_PASSWORD,
    "database": "invoice_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}
