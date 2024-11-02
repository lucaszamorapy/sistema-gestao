const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Viewproducts = sequelize.define(
  "Viewproducts",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
    },
    product_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Viewproducts",
    timestamps: false,
  }
);

module.exports = Viewproducts;
