import express from "express";
import { createMulterConfig } from "../middlewares/uploadImages.js";
import {
  loginController,
  registerController,
} from "../controllers/users/usersControllers.js";

const uploadUsers = createMulterConfig();
const uploadProducts = createMulterConfig(true);
const router = express.Router();

router.post("/user", uploadUsers.single("icon"), registerController);
router.post("/login", loginController);

export default router;
