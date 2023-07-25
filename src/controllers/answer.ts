import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  create,
  get,
  getAnswer as getAnswerService,
  remove,
  update,
} from "../services/answer";

const getAnswer = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getAnswerService(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getAnswer", success: false }, e);
  }
};

const getAnswers = async (req: Request, res: Response) => {
  try {
    const response = await get();
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getAnswers", success: false }, e);
  }
};

const createAnswer = async ({ body }: Request, res: Response) => {
  try {
    const response = await create(body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR createAnswer", success: false }, e);
  }
};

const updateAnswer = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await update(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR updateAnswer", success: false }, e);
  }
};

const deleteAnswer = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await remove(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR deleteAnswer", success: false }, e);
  }
};

export { getAnswer, getAnswers, createAnswer, updateAnswer, deleteAnswer };
