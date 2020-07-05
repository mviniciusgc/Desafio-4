import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    
    const transactions = transactionsRepository.all();

    const balance = transactionsRepository.getBalance();
    console.log('o balancete = ' + balance.income);
    console.log('o balancete = ' + balance.outcome);
    console.log('o balancete = ' + balance.total);
    return response.json({transactions,balance});


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    
    const createTransaction = new CreateTransactionService(transactionsRepository);

    const transaction = createTransaction.execute({title:title,type:type,value:value});

    return response.json(transaction);
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
