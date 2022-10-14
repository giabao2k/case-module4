import { Wallet } from "../model/wallet"
import { Request, Response, NextFunction} from "express"
import { Transaction } from "../model/transaction";

class WalletController {
    showAllWallet = async(req: any, res: Response) => {
        try{            
            let idUser = req.decoded.idUser
            let wallets = await Wallet.find({idUser: idUser});
            res.status(200).json(wallets)
        }catch(err){
            res.status(404).json(err)
        }
    }
            
    addWallet = async (req: any, res:Response, next: NextFunction) =>{
        try{
            let id = req.decoded.idUser;
            let wallet = req.body;
            wallet.idUser = id;
            let walletNew = await Wallet.create(wallet);
            res.status(201).json(walletNew);
        }catch(err){
            next(err);
        }
    };

    updateWallet = async (req: any, res: Response, next: NextFunction) => {
        try{
            let idWallet = req.params.id;            
            let idUser = req.decoded.idUser;
            let wallet = await Wallet.findById(idWallet);
            if(!wallet){
                res.status(404).json;
            }else{
                let data = req.body;
                data._id = idWallet;
                data.idUser = idUser;
                await Wallet.findByIdAndUpdate({
                    _id: idWallet
                },data);                
                res.status(200).json(data);   
            }
        }catch(err){
            next(err);
        }
    }

    deleteWallet = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try{
            let wallet = await Wallet.findById(id);
            if(wallet){
               wallet.delete();
               res.status(204).json(); 
            }else{
                res.status(404).json();
            }
        }catch(err){
            next(err);
        }
    };

    getOneWallet =async (req: any, res: Response, next: NextFunction) => {
        let id = req.params.id;
        let wallet = await Wallet.findById(id);
        try{
            if(!wallet){
                res.status(404).json();
            }else{
                res.status(200).json(wallet);
            }
        }catch(err){
            next(err);
        }
    }
}

export default new WalletController();