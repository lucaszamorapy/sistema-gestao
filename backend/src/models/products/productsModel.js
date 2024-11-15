const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Products = sequelize.define(
  "Products",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM(
        "Tecnologia",
        "Alimentos",
        "Vestimentas",
        "Beleza",
        "Saúde"
      ),
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = Products;
