import { QuestionStatus } from "../enums";
import { Answer } from "./answer.interface";
import { Subtopic } from "./subtopic.interface";
import { Topic } from "./topic.interface";

export interface Question {
    _id: string;
    description: string;
    status: QuestionStatus;
    topic: Topic;
    subtopic: Subtopic;
    answers: Answer[];
    createdAt: Date;
    updatedAt: Date;
}
