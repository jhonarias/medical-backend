import { Schema, model } from "mongoose";
import { Question } from "../interfaces/question.interface";
import { QuestionStatus } from "../enums";

const QuestionSchema =  new Schema<Question>(
    {
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: QuestionStatus,
            required: true,
            default: QuestionStatus.ACTIVE,
        },
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'topics',
        },
        subtopic: {
            type: Schema.Types.ObjectId,
            ref: 'subtopics',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const QuestionModel = model("questions", QuestionSchema);
export default QuestionModel;