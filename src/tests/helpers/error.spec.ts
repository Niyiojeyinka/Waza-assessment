import { isError } from "../../helpers/error";

describe('isError', () => {
    it('should return true if the object is an ErrorResponse', () => {
        const response = {
            error: 'error message'
        };
        expect(isError(response)).toBe(true);
    });

    it('should return false if the object is not an ErrorResponse', () => {
        const response = {
            message: 'error message'
        };
        expect(isError(response)).toBe(false);
    });
});
    