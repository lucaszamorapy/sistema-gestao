import express from "express";
import { createMulterConfig } from "../middlewares/uploadImages.js";
import {
  loginController,
  registerController,
  userInfoController,
} from "../controllers/users/usersControllers.js";

const uploadUsers = createMulterConfig();
const uploadProducts = createMulterConfig(true);
const router = express.Router();

router.post("/user/register", uploadUsers.single("icon"), registerController);
router.post("/user/login", loginController);
router.post("/user/info", userInfoController);

export default router;
