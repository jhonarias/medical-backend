import { Types } from "mongoose";
import { TopicStatus } from "../enums/topic-status.enum";
import { Subtopic } from "../interfaces/subtopic.interface";
import SubtopicModel from "../models/subtopic";

const create = async (Subtopic: Subtopic) => {
  const response = await SubtopicModel.create(Subtopic);
  return {
    topic: response,
    success: true,
  };
};

const get = async () => {
  // const response = await SubtopicModel.find({status: TopicStatus.OPEN});
  const data = await SubtopicModel.aggregate([
    {
      $match: {
        status: TopicStatus.OPEN,
      },
    },
    {
      $lookup: {
        from: "topics",
        localField: "topic", // subtopic model
        foreignField: "_id", // topic model
        as: "topic",
      },
    },
    { $unwind: "$topic" },
  ]);

  return {
    data,
    success: true,
  };
};

const getSubtopic = async (_id: string) => {
  // const response = await SubtopicModel.findOne({_id});
  const response = await SubtopicModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(_id),
        status: TopicStatus.OPEN,
      },
    },
    {
      $lookup: {
        from: "topics",
        localField: "topic", // subtopic model
        foreignField: "_id", // topic model
        as: "topic",
      },
    },
    { $unwind: "$topic" },
  ]);
  return {
    data: response ? response[0] : [],
    success: true,
  };
};

const update = async (_id: string, data: Subtopic) => {
  const response = await SubtopicModel.findOneAndUpdate({ _id }, data, {
    new: true,
  });
  return {
    data: response,
    success: true,
  }
};

const remove = async (_id: string) => {
  const response = await SubtopicModel.findOneAndRemove({ _id });
  return {
    data: response,
    success: true,
  }
};

export { create, get, getSubtopic, update, remove };
