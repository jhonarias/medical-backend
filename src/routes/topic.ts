import { Router } from "express";
import {
  createTopic,
  deleteTopic,
  getTopic,
  getTopics,
  updateTopic,
  upload,
} from "../controllers/topic";
import { validateCreateAndUpdate } from "../validators/topic";
import { checkSessionMiddleware } from "../middleware/session";
import { rolMiddleware } from "../middleware/rol";
import { UserType } from "../enums";

const router = Router();

router.get(
  "/",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getTopics
);
router.get(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  getTopic
);
router.post(
  "/",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN]),
  validateCreateAndUpdate,
  // upload,
  createTopic
);
router.put(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN]),
  validateCreateAndUpdate,
  updateTopic
);
router.delete(
  "/:id",
  checkSessionMiddleware,
  rolMiddleware([UserType.ADMIN, UserType.USER]),
  deleteTopic
);

export { router };
