import { Answer } from "./answer.interface";
import { ApiResponse } from "./api-response";

export interface AnswerResponse extends ApiResponse {
  data: Answer;
}

export interface AnswerDataResponse extends ApiResponse {
  data: Answer[];
}
