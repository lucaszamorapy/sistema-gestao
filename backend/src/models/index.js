const Products = require("./products/productsModel.js");
const Types = require("./types/typesModel.js");

Products.belongsTo(Types, { foreignKey: "type_id" });

module.exports = {
  Products,
  Types,
};
