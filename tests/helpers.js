const assert = require('chai').assert;

const { reallyUsefulFunction } = require('../server/helpers');

describe.only('test', () => {
  it('should return true', () => {
    
    assert.equal(reallyUsefulFunction(), true);
    assert.equal(JSON.stringify({}), JSON.stringify({}));
  })
});
