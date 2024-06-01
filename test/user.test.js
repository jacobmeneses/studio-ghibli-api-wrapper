const assert = require('assert');
const { login, register, getUsers } = require('./client');

describe('User', () => {
  describe('Login', () => {
    it('should login', async () => {
      const response = await login('admin@example.com', '123456789');
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });

  describe('Register', () => {
    it('should not register', async () => {
      const res = await login('admin@example.com', '123456789');
      const b = await res.json();
      const response = await register(b.token, 'admin@example.com', '123456789', 'ADMIN');
      const body = await response.json();

      assert.equal(response.status, 409);
    });


    it('should register', async () => {
      const res = await login('admin@example.com', '123456789');
      const b = await res.json();
      const response = await register(b.token, 'new@example.com', '123456789', 'ADMIN');
      const body = await response.json();

      assert.equal(response.status, 201);
    });
  });

  describe('Get users', () => {
    it('should NOT get users if it is not logged in', async () => {
      const response = await getUsers('');
      const body = await response.json();

      assert.equal(response.status, 401);
    });

    it('should NOT get users if it is the wrong role', async () => {
      const res = await login('films@example.com', '123456789');
      const b = await res.json();
      const response = await getUsers(b.token);
      const body = await response.json();

      assert.equal(response.status, 403);
    });

    it('should get users', async () => {
      const res = await login('admin@example.com', '123456789');
      const b = await res.json();
      const response = await getUsers(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });
});
