import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import {
  create,
  get,
  getSubtopic as getSubtopicService,
  remove,
  update,
} from "../services/subtopic";

const getSubtopic = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getSubtopicService(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getSubtopic", success: false }, e);
  }
};

const getSubtopics = async (req: Request, res: Response) => {
  try {
    const response = await get();
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getSubtopics", success: false }, e);
  }
};

const createSubtopic = async ({ body }: Request, res: Response) => {
  try {
    const response = await create(body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR createSubtopic", success: false }, e);
  }
};

const updateSubtopic = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await update(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR updateSubtopic", success: false }, e);
  }
};

const deleteSubtopic = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await remove(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR deleteSubtopic", success: false }, e);
  }
};

export { getSubtopic, getSubtopics, createSubtopic, updateSubtopic, deleteSubtopic };
