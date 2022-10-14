import { Router } from "express";
import { authAdmin } from "../middleware/checkAdmin";
import userController from "../controller/user-controller";

export const userRoute = Router();

userRoute.use(authAdmin)
userRoute.get('', userController.getAll);
userRoute.post('', userController.addUser);
userRoute.put('/:id', userController.updateUser);
userRoute.delete('/:id', userController.deleteUser);
