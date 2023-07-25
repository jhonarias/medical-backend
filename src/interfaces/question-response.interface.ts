import { Answer } from "./answer.interface";
import { ApiResponse } from "./api-response";
import { Question } from "./question.interface";

export interface QuestionResponse extends ApiResponse {
    data: Question;
}

export interface QuestionDataResponse extends ApiResponse {
    data: QuestionData[];
}

export interface QuestionData extends Question {
    answers: Answer[];
}