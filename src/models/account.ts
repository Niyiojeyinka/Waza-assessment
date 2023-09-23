import Decimal from 'decimal.js';
import { generateUniqueId } from '../helpers/id-generator';

export type AccountID = string;

/**
 * ideally, in a real life scenario, we'd have a separate user entity and the account entity will be linked to it
 */
export class Account {
    id: AccountID;
    holderName: string;
    accountType: string;
    balance: Decimal; 
    /**
     * using decimal to avoid floating point errors, all calculations will be done in decimal
     * another approach would be using lowest denomination of the currency (e.g. cents for USD, kobo for NGN or satoshi for BTC etc)
     *
     **/
    currency: string = "NGN";
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    constructor(holderName: string, accountType: string, initialBalance: Decimal, currency: string) {
        this.id = generateUniqueId();
        this.holderName = holderName;
        this.accountType = accountType;
        this.balance = initialBalance;
        this.currency = currency;
    }

    debit(amount: Decimal) {
        this.balance = this.balance.minus(amount);
        this.updatedAt = new Date();
    }

    credit(amount: Decimal) {
        this.balance = this.balance.plus(amount);
        this.updatedAt = new Date();
    }
}
