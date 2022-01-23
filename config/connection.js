require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: '127.0.0.1',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      // logging: () => {
      //   if (process.env.NODE_ENV !== "test" || process.env.NODE_ENV !== "production") return true;
      //   return false;
      // }
      logging: true
    });

module.exports = sequelize;
