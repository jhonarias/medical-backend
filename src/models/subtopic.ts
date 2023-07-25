import { Schema, model } from "mongoose";
import { Subtopic } from "../interfaces/subtopic.interface";
import { TopicStatus } from "../enums/topic-status.enum";

const SubtopicSchema =  new Schema<Subtopic>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'topics',
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

const SubtopicModel = model("subtopics", SubtopicSchema);
export default SubtopicModel;