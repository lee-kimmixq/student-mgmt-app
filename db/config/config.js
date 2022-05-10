require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD || null,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: { // https://github.com/sequelize/sequelize/issues/12083
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
