import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface UserRequest extends Request {
  user?: string | JwtPayload;
}
