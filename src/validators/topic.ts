import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validate";

const validateCreateAndUpdate = [
  check("name").exists().not().isEmpty(),
  check("description").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateCreateAndUpdate };
