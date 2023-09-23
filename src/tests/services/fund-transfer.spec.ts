import Decimal from "decimal.js";
import FundTransfer from "../../services/fund-transfer";
import { ITransaction } from "../../models/transaction";

describe('FundTransfer', () => {
    it('should create an instance of FundTransfer', () => {
        const service = new FundTransfer();
        expect(service).toBeDefined();
    });

    describe('createAccount', () => {
        it('should create an account', () => {
            const service = new FundTransfer();
            const account = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            expect(account).toBeDefined();
            expect(account.id).toBeDefined();
            expect(account.holderName).toBe('John Doe');
            expect(account.accountType).toBe('savings');
            expect(account.balance).toEqual(new Decimal(1000));
            expect(account.currency).toBe('NGN');
            expect(account.createdAt).toBeDefined();
            expect(account.updatedAt).toBeDefined();
        });
    });

    describe('transferFunds', () => {
        it('should transfer funds from one account to another', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(500));

            expect(transaction).toBeDefined();
            expect((transaction as ITransaction).id).toBeDefined();
            expect((transaction as ITransaction).sourceAccountId).toBe(source.id);
            expect((transaction as ITransaction).destinationAccountId).toBe(destination.id);
            expect((transaction as ITransaction).amount).toEqual(new Decimal(500));
            expect((transaction as ITransaction).createdAt).toBeDefined();
        });

        it('should not transfer funds to the same account', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');

            const transaction = service.transferFunds(source.id, source.id, new Decimal(500));

            expect(transaction).toBeDefined();
            expect((transaction as any).error).toBe('Cannot transfer funds to the same account');
        });

        it('should not transfer funds from an invalid source account', () => {
            const service = new FundTransfer();
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds('1', destination.id, new Decimal(500));

            expect(transaction).toBeDefined();
            expect((transaction as any).error).toBe('Invalid source or destination account');
        });

        it('should not transfer funds to an invalid destination account', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');

            const transaction = service.transferFunds(source.id, '2', new Decimal(500));

            expect(transaction).toBeDefined();
            expect((transaction as any).error).toBe('Invalid source or destination account');
        });

        it('should not transfer negative amount', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(-500));

            expect(transaction).toBeDefined();
            expect((transaction as any).error).toBe('Cannot transfer negative amount');
        });

        it('should not transfer funds if source account has insufficient funds', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(1500));

            expect(transaction).toBeDefined();
            expect((transaction as any).error).toBe('Insufficient funds');
        });

        it('should get transaction history for an account', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(500));

            const transactions = service.getTransactionHistory(source.id);

            expect(transactions).toBeDefined();
            expect(transactions.length).toBe(1);
            expect(transactions[0]).toEqual(transaction);
        });

        it('should not get transaction history for an invalid account', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(500));

            const transactions = service.getTransactionHistory('1');

            expect(transactions).toBeDefined();
            expect(transactions.length).toBe(0);
        });
    });

    describe('getTransactionHistory', () => {
        it('should get transaction history for an account', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(500));

            const transactions = service.getTransactionHistory(source.id);

            expect(transactions).toBeDefined();
            expect(transactions.length).toBe(1);
            expect(transactions[0]).toEqual(transaction);
        });

        it('should not get transaction history for an invalid account', () => {
            const service = new FundTransfer();
            const source = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');
            const destination = service.createAccount('Jane Doe', 'savings', new Decimal(0), 'NGN');

            const transaction = service.transferFunds(source.id, destination.id, new Decimal(500));

            const transactions = service.getTransactionHistory('1');

            expect(transactions).toBeDefined();
            expect(transactions.length).toBe(0);
        });
    });

    describe('getAccount', () => {
        it('should get an account', () => {
            const service = new FundTransfer();
            const account = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');

            const result = service.getAccount(account.id);

            expect(result).toBeDefined();
            expect(result).toEqual(account);
        });

        it('should not get an invalid account', () => {
            const service = new FundTransfer();
            const account = service.createAccount('John Doe', 'savings', new Decimal(1000), 'NGN');

            const result = service.getAccount('1');

            expect(result).toBeUndefined();
        });
    });
});

