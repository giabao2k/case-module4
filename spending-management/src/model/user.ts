import { model, Schema } from "mongoose";

export interface IUser {
    username: string;
    password: string;
    role: string
}

const userSchema = new Schema<IUser>({
    username: String,
    password: String,
    role: {
        type: String, 
        default: "client"
    }
})

const User = model<IUser>("users", userSchema);

export {User};