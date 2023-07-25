import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth";

const registerCtrl = async ({ body }: Request, res: Response) => {
  const response = await registerNewUser(body);
  res.send(response);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const response = await loginUser({ email, password });

  if (response.error) {
    res.status(403);
    res.send(response);
    return;
  }
  res.send(response);
};

export { registerCtrl, loginCtrl };
