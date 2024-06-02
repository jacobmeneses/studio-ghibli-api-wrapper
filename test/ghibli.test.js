const assert = require('assert');
const {
  login,
  ghibli,
} = require('./client');
const password = '123456789';

describe('Ghibli', () => {
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

  describe('Get by id', () => {
    it('should return forbidden', async () => {
      const r = await login('admin@example.com', password);
      const b = await r.json();

      const response = await ghibli(b.token, { id: '2baf70d1-42bb-4437-b551-e5fed5a87abe' });
      const body = await response.json();

      assert.equal(response.status, 403);
    });

    it('should get a film by id', async () => {
      const r = await login('films@example.com', password);
      const b = await r.json();

      const response = await ghibli(b.token, { id: '2baf70d1-42bb-4437-b551-e5fed5a87abe' });
      const body = await response.json();

      assert.equal(response.status, 200);
    });

    it('should get a person by id', async () => {
      const r = await login('people@example.com', password);
      const b = await r.json();

      const response = await ghibli(b.token, { id: 'fe93adf2-2f3a-4ec4-9f68-5422f1b87c01' });
      const body = await response.json();

      assert.equal(response.status, 200);
    });

    it('should get a location by id', async () => {
      const r = await login('locations@example.com', password);
      const b = await r.json();

      const response = await ghibli(b.token, { id: '11014596-71b0-4b3e-b8c0-1c4b15f28b9a' });
      const body = await response.json();

      assert.equal(response.status, 200);
    });

    it('should get a species by id', async () => {
      const r = await login('species@example.com', password);
      const b = await r.json();

      const response = await ghibli(b.token, { id: 'af3910a6-429f-4c74-9ad5-dfe1c4aa04f2' });
      const body = await response.json();

      assert.equal(response.status, 200);
    });

    it('should get a vehicle by id', async () => {
      const r = await login('vehicles@example.com', password);
      const b = await r.json();

      const response = await ghibli(b.token, { id: '4e09b023-f650-4747-9ab9-eacf14540cfb' });
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });
});
