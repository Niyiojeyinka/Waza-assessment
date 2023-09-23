/**
 * will be using this file for all database related simulated operations
*/

/**
 * ideally in a real life scenario, we'd have a database connection and we'd use transactions
 * to ensure ACID of our operations so will be using this class to simulate that
 */
class SimulatedDBTransaction {
    private operations: (() => void)[] = [];
    private rollbackOperations: (() => void)[] = [];

    addOperation(operation: () => void, rollback: () => void) {
        this.operations.push(operation);
        this.rollbackOperations.push(rollback);
    }

    commit() {
        try {
            for (const operation of this.operations) {
                operation();
            }
            this.operations = [];
            this.rollbackOperations = [];
        } catch (error) {
            this.rollback();
            throw error;
        }
    }

    rollback() {
        for (const rollback of this.rollbackOperations) {
            rollback();
        }
    }
}

export default SimulatedDBTransaction;
