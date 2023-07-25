import { Router } from "express";
import { getOrders } from "../controllers/order";
import { checkSessionMiddleware } from "../middleware/session";
import { rolMiddleware } from "../middleware/rol";
import { UserType } from "../enums";

const router = Router();

router.get(
  "/",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getOrders
);

export { router };
