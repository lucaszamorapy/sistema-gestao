const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Types = sequelize.define(
  "Types",
  {
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "types",
    timestamps: false,
  }
);

module.exports = Types;
