import Decimal from 'decimal.js';
import { generateUniqueId } from '../helpers/id-generator';
import { AccountID } from './account';

export type TransactionID = string;
export interface ITransaction {
    id: TransactionID;
    sourceAccountId: AccountID;
    destinationAccountId: AccountID;
    amount: Decimal;
    createdAt: Date;
}

export class Transaction {
    id: TransactionID;
    sourceAccountId: AccountID;
    destinationAccountId: AccountID;
    amount: Decimal; // check account.ts for more info
    createdAt: Date = new Date();

    constructor(sourceAccountId: AccountID, destinationAccountId: AccountID, amount: Decimal) {
        this.id = generateUniqueId();
        this.sourceAccountId = sourceAccountId;
        this.destinationAccountId = destinationAccountId;
        this.amount = amount;
    }
}
