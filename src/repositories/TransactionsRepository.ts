import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (total, transaction) => {
        if (transaction.type === "income") {
          total.income += transaction.value;
        } else if (transaction.type === "outcome") {
          total.outcome += transaction.value;
        }
        return total;
      },
      {
        income: 0,
        outcome: 0,
      })

    return { income, outcome, total: income - outcome};


    // TODO
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {

    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;

    // TODO
  }
}

export default TransactionsRepository;
