import { ApiResponse } from "./api-response";
import { User } from "./user.interface";

export interface AuthRegisterResponse extends ApiResponse {
    user: User;
}