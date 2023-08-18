import { AnswerStatus } from "../enums";
import { Question } from "./question.interface";

export interface Answer {
    _id: string;
    description: string;
    isCorrect: boolean;
    status: AnswerStatus;
    question: Question;
    createdAt: Date;
    updatedAt: Date;
}
