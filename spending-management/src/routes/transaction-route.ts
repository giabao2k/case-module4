import Router from 'express';
import transactionController from '../controller/transaction-controller';
import {auth} from '../middleware/auth';


export const transactionRouter = Router();

transactionRouter.use(auth);

transactionRouter.get('/:id', transactionController.getAllTransactionByIdWallet);
transactionRouter.post('', transactionController.addTransaction);
transactionRouter.delete('/:id', transactionController.deleteTransaction);