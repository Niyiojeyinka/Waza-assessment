import SimulatedDBTransaction from "../../helpers/database";

describe('SimulatedDBTransaction', () => {
    describe('Commit', () => {
        it('should simulate a database transaction', () => {
            const transaction = new SimulatedDBTransaction();
            let value = 0;
            transaction.addOperation(() => {
                value = 1;
            }, () => {
                value = 0;
            });
            transaction.addOperation(() => {
                value = 2;
            }, () => {
                value = 0;
            });
            transaction.addOperation(() => {
                value = 3;
            }, () => {
                value = 0;
            });
            transaction.commit();
            expect(value).toBe(3);
        });
    });

    describe('Rollback', () => {
        it('should simulate a database transaction', () => {
            const transaction = new SimulatedDBTransaction();
            let value = 0;
            transaction.addOperation(() => {
                value = 1;
            }, () => {
                value = 0;
            });
            transaction.addOperation(() => {
                value = 2;
            }, () => {
                value = 0;
            });
            transaction.addOperation(() => {
                value = 3;
            }, () => {
                value = 0;
            });
            transaction.rollback();
            expect(value).toBe(0);
        });
    });
});
