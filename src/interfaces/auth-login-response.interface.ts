import { ApiResponse } from "./api-response";
import { User } from "./user.interface";

export interface AuthLoginResponse extends ApiResponse {
    token: string;
    user: User;
}