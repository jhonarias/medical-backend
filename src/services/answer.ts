import { Types } from "mongoose";
import { Answer } from "../interfaces/answer.interface";
import AnswerModel from "../models/answer";
import { AnswerStatus } from "../enums";

const create = async (answer: Answer) => {
  const response = await AnswerModel.create(answer);
  return response;
};

const get = async () => {
  // const response = await AnswerModel.find({status: AnswerStatus.ACTIVE});
  const response = await AnswerModel.aggregate([
    {
      $match: {
        status: AnswerStatus.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question", // answer model
        foreignField: "_id", // question model
        as: "questions",
      },
    },
  ]);
  return response;
};

const getAnswer = async (_id: string) => {
  const response = await AnswerModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(_id),
        status: AnswerStatus.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "question", // answer model
        foreignField: "_id", // question model
        as: "questions",
      },
    },
  ]);
  return response;
};

const update = async (_id: string, data: Answer) => {
  const response = await AnswerModel.findOneAndUpdate({ _id }, data, {
    new: true,
  });
  return response;
};

const remove = async (_id: string) => {
  const response = await AnswerModel.findOneAndRemove({ _id });
  return response;
};

export { create, get, getAnswer, update, remove };
