import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

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

export default Types;
