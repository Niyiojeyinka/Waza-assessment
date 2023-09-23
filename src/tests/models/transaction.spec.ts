import Decimal from "decimal.js";
import { TransactionID, Transaction } from "../../models/transaction";

describe('Transaction', () => {
    it('should create a transaction', () => {
        const transaction = new Transaction('1', '2', new Decimal(1000));
        expect(transaction).toBeDefined();
        expect(transaction.id).toBeDefined();
        expect(transaction.sourceAccountId).toBe('1');
        expect(transaction.destinationAccountId).toBe('2');
        expect(transaction.amount).toEqual(new Decimal(1000));
        expect(transaction.createdAt).toBeDefined();
    });
});
