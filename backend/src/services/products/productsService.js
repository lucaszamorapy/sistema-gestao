const Viewproducts = require("../../models/products/viewProductsModel.js");
const ResponseModel = require("../../models/response/responseModel.js");

const getAllProducts = async () => {
  try {
    const response = await Viewproducts.findAll();
    return new ResponseModel(response, "Todos os produtos foram encontrados!");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllProducts,
};
