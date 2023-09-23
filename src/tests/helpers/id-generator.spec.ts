import { generateUniqueId } from "../../helpers/id-generator";

describe('generateUniqueId', () => {
    it('should generate a unique id', () => {
        const id = generateUniqueId();
        expect(id).toBeDefined();
    });
});
