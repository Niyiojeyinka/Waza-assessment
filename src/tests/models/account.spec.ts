import Decimal from "decimal.js";
import { AccountID, Account } from "../../models/account";

describe('Account', () => {
    it('should create an account', () => {
        const account = new Account('John Doe', 'savings', new Decimal(1000), 'NGN');
        expect(account).toBeDefined();
        expect(account.id).toBeDefined();
        expect(account.holderName).toBe('John Doe');
        expect(account.accountType).toBe('savings');
        expect(account.balance).toEqual(new Decimal(1000));
        expect(account.currency).toBe('NGN');
        expect(account.createdAt).toBeDefined();
        expect(account.updatedAt).toBeDefined();
    });

    it('should debit an account', () => {
        const account = new Account('John Doe', 'savings', new Decimal(1000), 'NGN');
        account.debit(new Decimal(500));
        expect(account.balance).toEqual(new Decimal(500));
    });

    it('should credit an account', () => {
        const account = new Account('John Doe', 'savings', new Decimal(1000), 'NGN');
        account.credit(new Decimal(500));
        expect(account.balance).toEqual(new Decimal(1500));
    }
    );
});
