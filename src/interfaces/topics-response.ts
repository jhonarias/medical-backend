import { ApiResponse } from "./api-response";
import { Subtopic } from "./subtopic.interface";
import { Topic } from "./topic.interface";

export interface TopicResponse extends ApiResponse {
    data: Topic;
}

export interface TopicDataResponse extends ApiResponse {
    data: TopicData[];
}

export interface TopicData extends Topic {
    subtopics: Subtopic[];
}