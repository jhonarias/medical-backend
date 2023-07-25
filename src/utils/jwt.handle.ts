import { sign, verify } from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
const JWT_SECRET = process.env.JWT_SECRET || "defaultToken.010101";

const generateToken = async (user: User) => {
  const jwt = sign({ _id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

const verifyToken = (jwt: string) => {
  return verify(jwt, JWT_SECRET);
};

export { generateToken, verifyToken };
