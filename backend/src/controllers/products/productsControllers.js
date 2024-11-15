const productsService = require("../../services/products/productsService.js");

const getAllProductsController = async (req, res) => {
  try {
    const response = await productsService.getAllProducts();
    return res.status(200).json(response);
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

const createProductController = async (req, res) => {
  try {
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const product = { ...req.body, image };
    const response = await productsService.createProduct(product);
    return res.status(200).json(response);
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

const changeProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const product = { ...req.body, image };
    const response = await productsService.changeProduct(id, product);
    return res.status(200).json(response);
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.deleteProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

module.exports = {
  getAllProductsController,
  createProductController,
  changeProductController,
  deleteProductController,
};
