const assert = require('assert');
const {
  login,
  ghibli,
} = require('./client');
const password = '123456789';

describe.only('Ghibli', () => {
  describe('Admin', () => {
    const email = 'admin@example.com';

    it('should return forbidden', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token);
      const body = await response.json();

      assert.equal(response.status, 403);
    });
  });

  describe('Films', () => {
    const email = 'films@example.com';

    it('should get films', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
    });

    it('should get 5 films', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token, { limit: 5 });
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.equal(body.length, 5);
    });
  });

  describe('People', () => {
    const email = 'people@example.com';

    it('should get people', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });


  describe('Locations', () => {
    const email = 'locations@example.com';

    it('should get locations', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });

  describe('Species', () => {
    const email = 'species@example.com';

    it('should get species', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });

  describe('Vehicles', () => {
    const email = 'vehicles@example.com';

    it('should get vehicles', async () => {
      const r = await login(email, password);
      const b = await r.json();

      const response = await ghibli(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });
});
