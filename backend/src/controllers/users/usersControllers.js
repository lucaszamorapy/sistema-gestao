const usersService = require("../../services/users/usersService.js");

const registerController = async (req, res) => {
  try {
    const { name, last_name, email, password } = req.body;
    const icon = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const userCreated = await usersService.register(
      name,
      last_name,
      email,
      icon,
      password
    );
    return res.status(201).json(userCreated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.login(email, password);

    return res.status(200).json(token);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const userInfoController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const info = await usersService.userInfo(token);
    return res.status(200).json(info);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  userInfoController,
  registerController,
  loginController,
};
