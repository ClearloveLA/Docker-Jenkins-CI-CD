const assert = require('assert');

describe('Basic Test', () => {
    it('should return true', () => {
        assert.strictEqual(true, true);
    });
    
    it('should return correct string', () => {
        assert.strictEqual('Hello CI', 'Hello CI');
    });
}); 