import { Router } from "express";
import { registerCtrl, loginCtrl } from  "../controllers/auth";
import { validateCreateAndUpdate, validateLogin } from "../validators/user";

const router = Router();
/**
 * domain/auth/register or domain/auth/login with [POST]
 */
router.post('/register', validateCreateAndUpdate, registerCtrl);
router.post('/login', validateLogin, loginCtrl);

export { router };