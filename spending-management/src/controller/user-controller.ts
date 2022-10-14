import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";

class UserController{
    getAll = async (req: Request, res:Response) =>{
        let users = await User.find();
        res.status(200).json(users);
    };
    addUser = async (req: Request, res:Response, next: NextFunction) =>{
        try{
            let user = req.body;
            let users = await User.create(user);
            res.status(201).json(users);
        }catch(err){
            next(err);

        }
    };
    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try{
            let user = await User.findById(id);
            if(user){
               user.delete();
               res.status(204).json(); 
            }else{
                res.status(404).json();
            }
        }catch(err){
            next(err);
        }
    };
    getUser = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let user = await User.findById(id);
        try{
            if(!user){
                res.status(404).json();
            }else{
                res.status(200).json(user);
            }
        }catch(err){
            next(err);
        }
    };
    updateUser = (req: Request, res: Response, next: NextFunction) =>{
        let id = req.params.id;
        let user = User.findById(id);
        if(!user){
            res.status(404).json;
        }else{
            let data = req.body;
            User.findByIdAndUpdate({
                _id:id
            },data);
            data._id = id;
            res.status(200).json(data);   

        }
    }

    getCurrentUser = async (req: any, res: Response, next: NextFunction) => {
        let idUser = req.decoded.idUser;
        console.log(idUser);
        try{
            let user = await User.findById(idUser);
            if(user){
               res.status(200).json(user); 
            }else{
                res.status(404).json();
            }
        }catch(err){
            next(err);
        }
    }
}
export default new UserController();