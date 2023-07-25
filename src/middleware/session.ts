import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { handleHttp } from "../utils/error.handle";
import { UserRequest } from "../interfaces/user-response.interface";

const checkSessionMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtByUser = req.headers.authorization || null;
    const jwt = jwtByUser?.split(" ").pop();
    const isUser = verifyToken(`${jwt}`);
    req.user = isUser;
    console.log('isUser', isUser);
    next();
  } catch (error) {
    handleHttp(res, { error: "Unauthorized", success: false }, error, 401);
  }
};

export { checkSessionMiddleware };
