import { Types } from "mongoose";
import { TopicStatus } from "../enums/topic-status.enum";
import { Topic } from "../interfaces/topic.interface";
import TopicModel from "../models/topic";
import { TopicDataResponse, TopicResponse } from "../interfaces/topics-response";

const create = async (topic: Topic): Promise<TopicResponse> => {
  const topicModel = await TopicModel.create(topic);
  return {
    data: topicModel,
    success: true,
  };
};

const get = async (): Promise<TopicDataResponse> => {
  // const response = await TopicModel.find({status: TopicStatus.OPEN});
  const data = await TopicModel.aggregate([
    {
      $match: {
        status: TopicStatus.OPEN,
      },
    },
    {
      $lookup: {
        from: "subtopics",
        localField: "_id", // topic model
        foreignField: "topic", // subtopic model
        as: "subtopics",
      },
    },
    // {
    //   $lookup: {
    //     from: "questions",
    //     localField: "_id", // topic model
    //     foreignField: "topic", // question model
    //     as: "questions",
    //   },
    // },
  ]);
  return {
    data,
    success: true,
  };
};

const getTopic = async (_id: string): Promise<TopicResponse> => {
  const data = await TopicModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(_id),
        status: TopicStatus.OPEN,
      },
    },
    {
      $lookup: {
        from: "subtopics",
        localField: "_id", // topic model
        foreignField: "topic", // subtopic model
        as: "subtopics",
      },
    },
  ]);
  return {
    data: data? data[0] : [],
    success: true,
  };
};

const update = async (_id: string, data: Topic): Promise<TopicResponse> => {
  const response = await TopicModel.findOneAndUpdate({ _id }, data, {
    new: true,
  });
  return {
    data: response,
    success: true,
  } as TopicResponse;
};

const remove = async (_id: string): Promise<TopicResponse> => {
  const response = await TopicModel.findOneAndRemove({ _id });
  return {
    data: response,
    success: true,
  } as TopicResponse;
};

export { create, get, getTopic, update, remove };
