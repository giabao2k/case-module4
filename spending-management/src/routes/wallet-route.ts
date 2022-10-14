import { Router } from "express";
import { auth } from "../middleware/auth";
import walletController from "../controller/wallet-controller";
import { authAdmin } from "../middleware/checkAdmin";

export const walletRoute = Router();

walletRoute.use(auth);
walletRoute.get('', walletController.showAllWallet);
walletRoute.post('', walletController.addWallet);
walletRoute.get('/:id', walletController.getOneWallet);
walletRoute.put('/:id', walletController.updateWallet);
walletRoute.delete('/:id', walletController.deleteWallet);