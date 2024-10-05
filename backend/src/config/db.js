import { Sequelize } from "sequelize";

const sequelize = new Sequelize("c3-comercial", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
