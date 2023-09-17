import { Router } from "express";
import {
  createAnswer,
  deleteAnswer,
  getAnswer,
  getAnswers,
  updateAnswer,
} from "../controllers/answer";
import { validateCreateAndUpdate } from "../validators/answer";
import { checkSessionMiddleware } from "../middleware/session";
import { rolMiddleware } from "../middleware/rol";
import { UserType } from "../enums";

const router = Router();

router.get(
  "/",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getAnswers
);
router.get(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getAnswer
);
router.post(
  "/",
  // validateCreateAndUpdate,
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN]),
  createAnswer
);
router.put(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN]),
  // validateCreateAndUpdate,
  updateAnswer
);
router.delete(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  deleteAnswer
);

export { router };
