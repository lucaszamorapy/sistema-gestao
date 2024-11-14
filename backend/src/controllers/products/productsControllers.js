const productsService = require("../../services/products/productsService.js");

const getAllProductsController = async (req, res) => {
  try {
    const response = await productsService.getAllProducts();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ error: "Nenhum produto foi encontrado" });
  }
};

module.exports = {
  getAllProductsController,
};
