import {
  login,
  register,
  userInfo,
} from "../../services/users/usersService.js";

export const registerController = async (req, res) => {
  try {
    const { name, last_name, email, password } = req.body;
    const icon = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const userCreated = await register(name, last_name, email, icon, password);
    return res.status(201).json(userCreated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);

    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const userInfoController = async (req, res) => {
  try {
    const { email } = req.body;
    const info = await userInfo(email);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
