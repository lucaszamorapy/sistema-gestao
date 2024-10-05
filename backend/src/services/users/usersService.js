import Users from "../../models/users/usersModel.js";
import bcrypt from "bcrypt";
import ResponseModel from "../../models/response/responseModel.js";
import jwt from "jsonwebtoken";

export const register = async (name, last_name, email, icon, password) => {
  try {
    const findExistUser = await Users.findOne({ where: { email } });
    if (findExistUser) {
      throw new Error("E-mail já cadastrado.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userCreated = await Users.create({
      name,
      last_name,
      email,
      icon,
      password: hashedPassword,
    });

    return new ResponseModel(userCreated, "Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Register error:", error);
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const findExistUser = await Users.findOne({ where: { email } });

    if (!findExistUser) {
      throw new Error("Usuário não encontrado.");
    }
    const isMatch = await bcrypt.compare(password, findExistUser.password);
    if (!isMatch) {
      throw new Error("Senha ou usuário inválidos.");
    }
    const token = jwt.sign(
      {
        user_id: findExistUser.user_id,
        email: findExistUser.email,
      },
      "YOUR_SECRET_KEY",
      { expiresIn: "1h" }
    );
    return new ResponseModel(token, `Bem-vindo usuário ${findExistUser.name}!`);
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message);
  }
};

export const userInfo = async (token) => {
  try {
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
    console.log(decoded);
    const findExistUser = await Users.findByPk(decoded.user_id); //user_id é a decodificação do obj do token (user_id e email)

    if (!findExistUser) {
      throw new Error("Usuário não encontrado.");
    }

    return new ResponseModel(
      {
        user_id: findExistUser.user_id,
        name: findExistUser.name,
        last_name: findExistUser.last_name,
        email: findExistUser.email,
        icon: findExistUser.icon,
      },
      `Busca do usuário ${findExistUser.name} realizado com sucesso`
    );
  } catch (err) {
    throw new Error(err.message);
  }
};
