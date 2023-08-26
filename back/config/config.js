const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "ori",
    password: process.env.DB_PASSWORD,
    database: "Monggeul",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
  },
  test: {
    username: "ori",
    password: process.env.DB_PASSWORD,

    database: "Monggeul",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
  },
  production: {
    username: "ori",
    password: process.env.DB_PASSWORD,
    database: "Monggeul",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
  },
};
