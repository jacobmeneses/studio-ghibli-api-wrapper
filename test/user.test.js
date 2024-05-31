const assert = require('assert');
const BaseUrl = 'http://0.0.0.0:3021/api/v1';

describe('User', () => {
  describe('Login', () => {
    it('should login', async () => {
      const response = await fetch(BaseUrl + '/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'admin@example.com', password: '123456789' }),
      });
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });
});
