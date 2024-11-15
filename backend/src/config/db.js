const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sgs", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
