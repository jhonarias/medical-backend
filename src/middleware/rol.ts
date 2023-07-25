import { NextFunction, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { UserRequest } from "../interfaces/user-response.interface";
import { JwtPayload } from "jsonwebtoken";

const rolMiddleware =
  (roles: string[]) =>
  (req: UserRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user as JwtPayload;
      const userRoles = user.role.split(",");
      const isAllowed = roles.some((rol) => userRoles.includes(rol));

      if (!isAllowed) {
        handleHttp(res, { error: "ERROR_PERMISSIONS", success: false }, "", 403);
        return;
      }
      next();
    } catch (error) {
      handleHttp(res, { error: "ERROR_PERMISSIONS", success: false }, error, 403);
    }
  };

export { rolMiddleware };
