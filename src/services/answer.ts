import { Types } from "mongoose";
import { Answer } from "../interfaces/answer.interface";
import AnswerModel from "../models/answer";
import { AnswerStatus } from "../enums";
import { AnswerDataResponse, AnswerResponse } from "../interfaces/answer-response.interface";

const create = async (answers: Answer[]): Promise<AnswerDataResponse> => {
  const response = await AnswerModel.create(answers);
  return {
    data: response,
    success: true,
  };
};

const get = async (): Promise<AnswerDataResponse> => {
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
        as: "question",
      },
    },
    { $unwind: "$question" },
  ]);
  return {
    data: response,
    success: true,
  };
};

const getAnswer = async (_id: string): Promise<AnswerResponse> => {
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
        as: "question",
      },
    },
    { $unwind: "$question" },
  ]);
  return {
    data: response? response[0] : {},
    success: true,
  };
};

const update = async (_id: string, data: Answer): Promise<AnswerResponse> => {
  const response = await AnswerModel.findOneAndUpdate({ _id }, data, {
    new: true,
  });
  return {
    data: response,
    success: true,
  } as AnswerResponse;
};

const remove = async (_id: string): Promise<AnswerResponse> => {
  const response = await AnswerModel.findOneAndRemove({ _id });
  return {
    data: response,
    success: true,
  } as AnswerResponse;
};

export { create, get, getAnswer, update, remove };
