// Quản lý giao dịch
import { Request, Response } from 'express';
import {Transaction} from '../model/transaction';
import moment, { isDate } from 'moment';

class TransactionController {
    getAllTransactionByIdWallet = async(req: any, res: any) => {
        try {
            let idWallet = req.params.id
            let transactions = await Transaction.find({
                walletId: idWallet
            }).populate("categoryId", "name");
            res.status(200).json(transactions);
        }catch {
            throw new Error('lỗi get transaction!')
        }
    };

    addTransaction = async(req: any, res: any) => {
        try {
            let transaction = req.body;
            new Date(transaction.time);
            await Transaction.create(transaction);
            res.status(200).json(transaction);
        }catch (err) {
            console.log(err);
        }
    }



    deleteTransaction = async (req: Request, res: Response) => {        
        try {
            let id = req.params.id;
            let transaction = await Transaction.findById(id);
            transaction.delete()
            res.status(204).json();
        }catch(err) {
            console.log(err);
            // throw new Error('lỗi xoá transaction!')
        }
    }
}

export default new TransactionController();