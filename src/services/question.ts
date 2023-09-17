import { Types } from "mongoose";
import { Question } from "../interfaces/question.interface";
import QuestionModel from "../models/question";
import { QuestionStatus } from "../enums";
import TopicModel from "../models/topic";
import SubtopicModel from "../models/subtopic";
import { QuestionDataResponse, QuestionResponse } from "../interfaces/question-response.interface";

const create = async (questions: Question[]): Promise<QuestionDataResponse> => {
  // const topicExists = await TopicModel.findOne({ _id: question.topic });
  // const subtopicExists = await SubtopicModel.findOne({
  //   _id: question.subtopic,
  // });

  // if (question.topic && !topicExists) {
  //   return Promise.resolve({
  //     error: "TOPIC_DOES_NOT_EXIST",
  //     success: false,
  //   } as QuestionResponse);
  // }

  // if (question.subtopic && !subtopicExists) {
  //   return Promise.resolve({
  //     error: "SUBTOPIC_DOES_NOT_EXIST",
  //     success: false,
  //   } as QuestionResponse);
  // }

  const questionModel = await QuestionModel.create(questions);
  const response = {
    data: questionModel,
    success: true,
  } as QuestionDataResponse;
  return response;
};

const get = async (): Promise<QuestionDataResponse> => {
  // const response = await QuestionModel.find({status: QuestionStatus.ACTIVE});
  const data = await QuestionModel.aggregate([
    {
      $match: {
        status: QuestionStatus.ACTIVE,
        $or: [
          { topic: { $exists: true } },
          { subtopic: { $exists: true } }
        ]
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id", // question model
        foreignField: "question", // answer model
        as: "answers",
      },
    },
    {
      $lookup: {
        from: "topics",
        localField: "topic", // question model
        foreignField: "_id", // topic model
        as: "topic",
      },
    },
    {
      $lookup: {
        from: "subtopics",
        localField: "subtopic", // question model
        foreignField: "_id", // topic model
        as: "subtopic",
      },
    },
    { $unwind: { path: "$topic", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$subtopic", preserveNullAndEmptyArrays: true } },
  ]);

  return {
    data,
    success: true,
  } as QuestionDataResponse;
};

const getQuestionsByTopic = async (_id: string): Promise<QuestionDataResponse> => {
  const data = await QuestionModel.aggregate([
    {
      $match: {
        topic: new Types.ObjectId(_id),
        status: QuestionStatus.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id", // question model
        foreignField: "question", // answer model
        as: "answers",
      },
    },
  ]);
  return {
    data,
    success: true,
  } as QuestionDataResponse;
};

const getQuestionsBySubtopic = async (_id: string): Promise<QuestionDataResponse> => {
  const data = await QuestionModel.aggregate([
    {
      $match: {
        subtopic: new Types.ObjectId(_id),
        status: QuestionStatus.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id", // question model
        foreignField: "question", // answer model
        as: "answers",
      },
    },
  ]);
  return {
    data,
    success: true,
  } as QuestionDataResponse;
};

const getQuestion = async (_id: string): Promise<QuestionResponse> => {
  const response = await QuestionModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(_id),
        status: QuestionStatus.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id", // question model
        foreignField: "question", // answer model
        as: "answers",
      },
    },
    {
      $lookup: {
        from: "topics",
        localField: "topic", // question model
        foreignField: "_id", // topic model
        as: "topic",
      },
    },
    {
      $lookup: {
        from: "subtopics",
        localField: "subtopic", // question model
        foreignField: "_id", // topic model
        as: "subtopic",
      },
    },
    { $unwind: { path: "$topic", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$subtopic", preserveNullAndEmptyArrays: true } },
  ]);
  return {
    data: response? response[0] : {},
    success: true,
  } as QuestionResponse;
};

const update = async (_id: string, data: Question) => {
  const response = await QuestionModel.findOneAndUpdate({ _id }, data, {
    new: true,
  });
  return {
    data: response,
    success: true,
  } as QuestionResponse;
};

const remove = async (_id: string) => {
  const response = await QuestionModel.findOneAndRemove({ _id });
  return {
    data: response,
    success: true,
  } as QuestionResponse;
};

export {
  create,
  get,
  getQuestion,
  getQuestionsByTopic,
  getQuestionsBySubtopic,
  update,
  remove,
};
