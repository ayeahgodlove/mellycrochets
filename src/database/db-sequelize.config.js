// sequelize.ts
const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectModule: mysql,
    benchmark: true,
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
    logging: (msg) => {
      // Only log the SQL query, not the entire options object
      if (typeof msg === 'string') {
        console.log(msg);
      }
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed", error);
  }
})();

module.exports = sequelize;
