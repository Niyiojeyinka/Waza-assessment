import * as readline from 'readline';
import FundTransfer from './services/fund-transfer';
import Decimal from 'decimal.js';
import { isError } from './helpers/error';

const mainReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const service = new FundTransfer();

const showInstructions = () => {
    console.log(`
    Welcome to Bank CLI:
    Available Commands:
    1. createAccount>"Name","AccountType",Balance,"Currency" - Create a new account.
    2. transferFunds>"SourceID","DestID",Amount - Transfer funds between accounts.
    3. getTransactionHistory>"AccountID" - View account transaction history.
    4. getAccount>"AccountID" - View account details.
    5. exit - Exit the CLI.
    `);
}

const entryPoint = () => {
    mainReadline.question('\nEnter command: ', async (command) => {
        command = command.trim();
        const matched = command.match(/^([^>]+)>"([^"]*)"?,?"([^"]*)"?,?([^,]+)?,?(?:"([^"]+)")?$/);
        if (command === 'exit') {
            mainReadline.close();
            return;
        }

        if (!matched) {
            console.log("Invalid command format.");
            return entryPoint();
        }

        const action = matched[1];
        const args = matched.slice(2).filter(Boolean);

        switch (action) {
            case 'createAccount':
                try {
                    /**
                     * ideally in a real life scenario,more validation will be done on the input
                     */
                    const accountHolderName = args[0];
                    const accountType = args[1];
                    const initialBalance = new Decimal(args[2]);
                    const currency = args[3] || 'NGN'; // default to NGN

                    const account = service.createAccount(accountHolderName, accountType, initialBalance, currency);
                    console.log('Account created:', account);
                } catch (error: any) {
                    console.error(error.message || error);
                }
                break;

            case 'transferFunds':
                try {
                    const sourceId = args[0];
                    const destinationId = args[1];
                    const amount = new Decimal(args[2]);

                    const result = service.transferFunds(sourceId, destinationId, amount);
                    if (isError(result)) {
                        console.error(result.error);
                    } else {
                        console.log('Transaction completed:', result);
                    }
                } catch (error: any) {
                    console.error(error.message || error);
                }
                break;

            case 'getTransactionHistory':
                const accountId = args[0];
                const transactions = service.getTransactionHistory(accountId);
                console.log('Transaction History for Account:', accountId);
                console.log(transactions);
                break;
            case 'getAccount':
                const account = service.getAccount(args[0]);
                console.log(account);
                break;
            default:
                console.log('Unknown command. Please refer to the instructions.');
                showInstructions();
        }

        entryPoint(); // Prompt the user again
    });
}

showInstructions();
entryPoint();
