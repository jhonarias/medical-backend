import { Router } from "express";
import {
  createSubtopic,
  deleteSubtopic,
  getSubtopic,
  getSubtopics,
  updateSubtopic,
} from "../controllers/subtopic";
import { validateCreateAndUpdate } from "../validators/subtopic";

const router = Router();

router.get("/", getSubtopics);
router.get("/:id", getSubtopic);
router.post("/", validateCreateAndUpdate, createSubtopic);
router.put("/:id", validateCreateAndUpdate, updateSubtopic);
router.delete("/:id", deleteSubtopic);

export { router };
