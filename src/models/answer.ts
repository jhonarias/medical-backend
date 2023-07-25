import { Schema, model } from "mongoose";
import { Answer } from "../interfaces/answer.interface";
import { AnswerStatus } from "../enums";

const AnswerSchema =  new Schema<Answer>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            enum: AnswerStatus,
            required: true,
            default: AnswerStatus.ACTIVE,
        },
        question: {
            type: Schema.Types.ObjectId,
            ref: 'topics',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const AnswerModel = model("answers", AnswerSchema);
export default AnswerModel;