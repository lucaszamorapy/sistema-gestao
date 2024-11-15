const Products = require("../../models/products/productsModel.js");
const ResponseModel = require("../../models/response/responseModel.js");

const getAllProducts = async () => {
  try {
    const response = await Products.findAll();
    return new ResponseModel(response, "Todos os produtos foram encontrados!");
  } catch (error) {
    throw new Error(error);
  }
};

const createProduct = async (data) => {
  try {
    const productExist = await Products.findOne({
      where: { name: data.name },
    });
    if (productExist) {
      throw new Error("Produto existente");
    }
    const response = await Products.create(data);
    return new ResponseModel(response, "Produto cadastrado com sucesso!");
  } catch (error) {
    throw new Error(error);
  }
};

const changeProduct = async (product_id, data) => {
  try {
    const findProduct = await Products.findOne({ where: { product_id } });
    if (!findProduct) {
      throw new Error("Produto não encontrado");
    }
    const response = await findProduct.update(data);
    return new ResponseModel(response, "Produto alterado com sucessso!");
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (product_id) => {
  try {
    const findProduct = await Products.findOne({ where: { product_id } });
    if (!findProduct) {
      throw new Error("Produto não encontrado");
    }
    const response = await findProduct.destroy();
    return new ResponseModel(null, "Produto deletado com sucessso!");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  changeProduct,
  deleteProduct,
};
