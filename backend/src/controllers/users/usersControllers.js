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
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

const loginController = async (req, res) => {
  try {
    const token = await usersService.login(req.body);
    return res.status(200).json(token);
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

const userInfoController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token não existe" });
  }
  try {
    const info = await usersService.userInfo(token);
    return res.status(200).json(info);
  } catch (error) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
};

module.exports = {
  userInfoController,
  registerController,
  loginController,
};
