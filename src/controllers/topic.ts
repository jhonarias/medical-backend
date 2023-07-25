import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import {
  create,
  get,
  getTopic as getTopicService,
  remove,
  update,
} from "../services/topic";
import multer from "multer";
import { Topic } from "../interfaces/topic.interface";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + "-" + fileName);
  },
});

const upload = multer({ storage }).single("file");

const getTopic = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getTopicService(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getTopic", success: false }, e);
  }
};

const getTopics = async (req: Request, res: Response) => {
  try {
    const response = await get();
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR getTopics", success: false }, e);
  }
};

const createTopic = async ({ body, file }: Request, res: Response) => {
  try {
    // const topic = {
    //   ...body,
    //   files: file?.filename ? "/uploads/" + file?.filename : '',
    // } as Topic;

    const response = await create(body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR createTopic", success: false }, e);
  }
};

const updateTopic = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await update(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR updateTopic", success: false }, e);
  }
};

const deleteTopic = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await remove(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, { error: "ERROR deleteTopic", success: false }, e);
  }
};

export { upload, getTopic, getTopics, createTopic, updateTopic, deleteTopic };
