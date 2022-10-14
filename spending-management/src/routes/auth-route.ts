import {Router} from "express";
import AuthController from "../controller/auth-controller";

export const AuthRoute = Router();

AuthRoute.post('/register', AuthController.register);
AuthRoute.post('/login', AuthController.login);