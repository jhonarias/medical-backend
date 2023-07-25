import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";
import { UserType } from "../enums";

const UserSchema =  new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: [UserType.USER, UserType.ADMIN],
            default: UserType.USER,
        },
        password: {
            type: String,
            required: true,
            // select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const UserModel = model("users", UserSchema);
export default UserModel;