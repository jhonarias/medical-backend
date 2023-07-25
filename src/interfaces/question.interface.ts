import { QuestionStatus } from "../enums";
import { Subtopic } from "./subtopic.interface";
import { Topic } from "./topic.interface";

export interface Question {
    _id: string;
    title: string;
    description: string;
    status: QuestionStatus;
    topic: Topic;
    subtopic: Subtopic;
    createdAt: Date;
    updatedAt: Date;
}
