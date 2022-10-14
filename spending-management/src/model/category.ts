import { model, Schema } from "mongoose"
import { IUser } from "./user";
export interface ICategory {
    name: string;
    description: string,
    type: string,
    idUser: IUser
}

const categorySchema = new Schema<ICategory>({
    name: String,
    description: String,
    type: String,
    idUser: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

const Category = model<ICategory>('categories', categorySchema);

export {Category};