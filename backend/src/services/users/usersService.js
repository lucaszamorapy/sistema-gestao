import Users from "../../models/users/usersModel.js";
import bcrypt from "bcrypt";
import ResponseModel from "../../models/response/responseModel.js";
import jwt from "jsonwebtoken";

export const register = async (name, last_name, email, icon, password) => {
  try {
    const findExistUser = await Users.findOne({ where: { email } });
    if (findExistUser) {
      return new ResponseModel(null, "E-mail já registrado.");
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
      return new ResponseModel(null, "Usuário não encontrado.");
    }
    const isMatch = await bcrypt.compare(password, findExistUser.password);
    if (!isMatch) {
      return new ResponseModel(null, "Senha ou usuário inválidos.");
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

export const userInfo = async (email) => {
  try {
    const findExistUser = await Users.findOne({ where: { email } });

    if (!findExistUser) {
      return new ResponseModel(null, "Usuário não encontrado.");
    }
    return new ResponseModel(findExistUser, "Usuário encontrado com sucesso!");
  } catch (error) {
    console.error("User info error:", error);
    throw new Error(error.message);
  }
};
