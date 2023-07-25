import { UserType } from "../enums";
import { Auth } from "./auth.interface";

export interface User extends Auth {
    _id?: string;
    name: string;
    username: string;
    role: UserType;
}