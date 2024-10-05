import Products from "./products/productsModel.js";
import Types from "./types/typesModel.js";

Products.belongsTo(Types, { foreignKey: "type_id" });

export default { Products, Types };
