// convert these to env variables process.env.___ later
var apiDbPassword = '123456';
var apiDbUser = 'hubbsly_service';
var apiDb = 'hubbsly_db';

const dbConfig = {
  HOST: 'localhost',
  USER: apiDbUser,
  PASSWORD: apiDbPassword,
  DB: apiDb,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbConfig;
