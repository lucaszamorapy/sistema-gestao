const express = require("express");
const createMulterConfig = require("../middlewares/uploadImages.js");
const usersController = require("../controllers/users/usersControllers.js");
const productsController = require("../controllers/products/productsControllers.js");

const uploadUsers = createMulterConfig();
const uploadProducts = createMulterConfig(true);
const router = express.Router();

router.post(
  "/user/register",
  uploadUsers.single("icon"),
  usersController.registerController
);
router.post("/user/login", usersController.loginController);
router.get("/user/info", usersController.userInfoController);
router.get("/products", productsController.getAllProductsController);
router.post(
  "/products/register",
  uploadProducts.single("image"),
  productsController.createProductController
);
router.put(
  "/products/change/:id",
  uploadProducts.single("image"),
  productsController.changeProductController
);
router.delete("/products/:id", productsController.deleteProductController);

module.exports = router;
