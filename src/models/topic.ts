import { Schema, model } from "mongoose";
import { Topic } from "../interfaces/topic.interface";
import { TopicStatus } from "../enums/topic-status.enum";

const TopicSchema =  new Schema<Topic>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: TopicStatus,
            required: true,
            default: TopicStatus.OPEN,
        },
        files: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const TopicModel = model("topics", TopicSchema);
export default TopicModel;