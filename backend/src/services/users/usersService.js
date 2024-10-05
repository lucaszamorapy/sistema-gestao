import Users from "../../models/users/usersModel.js";
import bcrypt from "bcrypt";
import ResponseModel from "../../models/response/responseModel.js";

export const register = async (name, last_name, email, icon, password) => {
  try {
    const findExistUser = await Users.findOne({ where: { email } });
    if (findExistUser) {
      return new ResponseModel(null, "E-mail já registrado!");
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
    throw new Error(error.message);
  }
};
