import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validate";
import { UserType } from "../enums";

// Doc: https://github.com/validatorjs/validator.js#sanitizers

const validateCreateAndUpdate = [
  check("name").exists().not().isEmpty(),
  check("username").exists().not().isEmpty(),
  check("email").exists().isEmail(),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 4, max: 10 })
    .custom((value, { req }) => {
        if (value.length < 4 || value.length > 10) {
          throw new Error(
            "El password debe contener minimo 4 caracteres y maximo 10 caracteres"
          );
        }
      return true;
    }),
    check("role").custom((value, { req }) => {
      if (value.toLowerCase() === UserType.ADMIN.toLowerCase()) {
        throw new Error(
          "No esta autorizado para crear un rol admin"
        );
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check("email").exists().isEmail(),
  check("password").exists().not().isEmpty().custom((value, { req }) => {
      if (value.length < 4 || value.length > 10) {
        throw new Error(
          "El password debe contener minimo 4 caracteres y maximo 10 caracteres"
        );
      }
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateCreateAndUpdate, validateLogin };
