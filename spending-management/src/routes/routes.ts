import { Router } from "express";
import {AuthRoute} from "./auth-route";
import { categoryRouter } from "./category-route";
import { userRoute } from "./user-route";
import { walletRoute } from "./wallet-route";
import {transactionRouter} from '../routes/transaction-route';
import { auth } from "../middleware/auth";
import userController from "../controller/user-controller";

export const routes = Router();

routes.use('', AuthRoute);
routes.use('/categories',categoryRouter);
routes.use('/wallets', walletRoute);
routes.use('/users', userRoute);
routes.use('/user', userController.getUser),
routes.use('/transaction', transactionRouter);
