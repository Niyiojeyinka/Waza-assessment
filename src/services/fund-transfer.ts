import Decimal from "decimal.js";
import SimulatedDBTransaction from "../helpers/database";
import { AccountID, Account } from "../models/account";
import { TransactionID, Transaction } from "../models/transaction";
import { ErrorResponse } from "../helpers/error";

class FundTransfer {
    accounts: Map<AccountID, Account> = new Map();
    transactions: Map<TransactionID, Transaction> = new Map();

    createAccount(holderName: string, accountType: string, initialBalance: Decimal, currency: string = 'NGN'): Account {
        const account = new Account(holderName, accountType, initialBalance, currency);
        this.accounts.set(account.id, account);
        return account;
    }

    transferFunds(sourceId: AccountID, destinationId: AccountID, amount: Decimal): Transaction | ErrorResponse {
        const source = this.accounts.get(sourceId);
        const destination = this.accounts.get(destinationId);

        if (sourceId === destinationId) return { error: "Cannot transfer funds to the same account"}

        if (!source || !destination) return { error: "Invalid source or destination account" };

        if (amount.isNegative()) return { error: "Cannot transfer negative amount" };

        if (source.balance.lessThan(amount)) return { error: "Insufficient funds" };

        /**
         * In a real-life scenario will need to ensure atomic operations for transaction safety and also use appropriate locks 
         * for now let simulate this using a class called SimulatedDBTransaction
        **/
        const dbTransaction = new SimulatedDBTransaction();
    
        dbTransaction.addOperation(
            () => { source.debit(amount); }, // Commit operation 
            () => { source.credit(amount); } // Rollback operation
        );

        dbTransaction.addOperation(
            () => { destination.credit(amount); }, // Commit operation 
            () => { destination.debit(amount); } // Rollback operation 
        );

        try {
            dbTransaction.commit();
            const transaction = new Transaction(sourceId, destinationId, amount);
            this.transactions.set(transaction.id, transaction);

            return transaction;
        } catch (error: any) {
            dbTransaction.rollback();
            // log error to a file or remote service
            console.error(error);
            return { error: "An error occurred while processing your transaction"};
        }

    }

    getTransactionHistory(accountId: AccountID): Transaction[] {
        const relatedTransactions: Transaction[] = [];
        console.log('all transactions', this.transactions)
        this.transactions.forEach(transaction => {
            if (transaction.sourceAccountId === accountId || transaction.destinationAccountId === accountId) {
                relatedTransactions.push(transaction);
            }
        });

        return relatedTransactions;
    }

    getAccount(accountId: AccountID): Account | undefined {
        return this.accounts.get(accountId);
    }
}

export default FundTransfer;
