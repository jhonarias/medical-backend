import { AuthLoginResponse } from "../interfaces/auth-login-response.interface";
import { AuthRegisterResponse } from "../interfaces/auth-register-response.interface";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async (user: User): Promise<AuthRegisterResponse> => {
  const checkIs = await UserModel.findOne({ email: user.email });

  if (checkIs)
    return Promise.resolve({
      error: "ALREADY_USER",
      success: false,
    } as AuthRegisterResponse);

  const passHash = await encrypt(user.password);
  const userModel = await UserModel.create({
    ...user,
    password: passHash,
  });
  const response = {
    user: {
      email: userModel.email,
      name: userModel.name,
      role: userModel.role,
      username: userModel.username,
    },
    success: true,
  } as AuthRegisterResponse;
  return response;
};

const loginUser = async ({
  email,
  password,
}: Auth): Promise<AuthLoginResponse> => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs)
    return Promise.resolve({
      error: "NOT_FOUND_USER",
      success: false,
    } as AuthLoginResponse);
  const passwordHash = checkIs.password; // encrypted
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect)
    return Promise.resolve({
      error: "PASSWORD_INCORRECT",
      success: false,
    } as AuthLoginResponse);

  const token = await generateToken(checkIs);
  return Promise.resolve({
    token,
    user: {
      email: checkIs.email,
      name: checkIs.name,
      role: checkIs.role,
      username: checkIs.username,
    } as User,
    success: true,
  } as AuthLoginResponse);
};

export { registerNewUser, loginUser };
