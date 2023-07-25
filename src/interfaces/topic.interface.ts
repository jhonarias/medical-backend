import { TopicStatus } from "../enums/topic-status.enum";
import { Subtopic } from "./subtopic.interface";

export interface Topic {
    name: string;
    description: string;
    status: TopicStatus;
    files: string;
    subtopics: Subtopic[];
    createdAt: Date;
    updatedAt: Date;
}