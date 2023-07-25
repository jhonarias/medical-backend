import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  create,
  get,
  getQuestion as getQuestionService,
  getQuestionsByTopic as getQuestionsByTopicService,
  getQuestionsBySubtopic as getQuestionsBySubtopicService,
  remove,
  update,
} from "../services/question";

const getQuestion = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getQuestionService(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getQuestion", success: false }, e);
  }
};

const getQuestionsByTopic = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getQuestionsByTopicService(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getQuestionsByTopic", success: false }, e);
  }
};

const getQuestionsBySubtopic = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getQuestionsBySubtopicService(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getQuestionsBySubtopic", success: false }, e);
  }
};

const getQuestions = async (req: Request, res: Response) => {
  try {
    const response = await get();
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getQuestions", success: false }, e);
  }
};

const createQuestion = async ({ body }: Request, res: Response) => {
  try {
    const response = await create(body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR createQuestion", success: false }, e);
  }
};

const updateQuestion = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await update(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR updateQuestion", success: false }, e);
  }
};

const deleteQuestion = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await remove(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR deleteQuestion", success: false }, e);
  }
};

export {
  getQuestion,
  getQuestions,
  getQuestionsByTopic,
  getQuestionsBySubtopic,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
