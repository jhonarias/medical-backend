import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  getQuestionsBySubtopic,
  getQuestionsByTopic,
  updateQuestion,
} from "../controllers/question";
import { validateCreateAndUpdate } from "../validators/question";
import { checkSessionMiddleware } from "../middleware/session";
import { rolMiddleware } from "../middleware/rol";
import { UserType } from "../enums";

const router = Router();

router.get(
  "/",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getQuestions
);
router.get(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getQuestion
);
router.get(
  "/questionsByTopic/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getQuestionsByTopic
);
router.get(
  "/questionsBySubtopic/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getQuestionsBySubtopic
);
router.post(
  "/",
  // validateCreateAndUpdate,
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN]),
  createQuestion
);
router.put(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN]),
  // validateCreateAndUpdate,
  updateQuestion
);
router.delete(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  deleteQuestion
);

export { router };
