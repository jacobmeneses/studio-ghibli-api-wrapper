const assert = require('assert');
const {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUsers,
} = require('./client');

const NonExistentId = 9999999;
const AdminEmail = 'admin@example.com';
const AdminPassword = '123456789';

describe('User', () => {
  describe('Login', () => {
    it('should login', async () => {
      const response = await login(AdminEmail, AdminPassword);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });

  describe('Register', () => {
    it('should not register', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await register(b.token, AdminEmail, AdminPassword, 'ADMIN');
      const body = await response.json();

      assert.equal(response.status, 409);
    });


    it('should register', async () => {
      const res = await login(AdminEmail, AdminPassword);
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
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await getUsers(b.token);
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.equal(body.users.length > 0, true);
    });
  });

  describe('Get user by id', () => {
    it('should NOT get an user if it is not logged in', async () => {
      const response = await getUserById('', 2);
      const body = await response.json();

      assert.equal(response.status, 401);
    });

    it('should NOT get an user if it is the wrong role', async () => {
      const res = await login('films@example.com', '123456789');
      const b = await res.json();
      const response = await getUserById(b.token, 1);
      const body = await response.json();

      assert.equal(response.status, 403);
    });

    it('should NOT get an user if it does not exists', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await getUserById(b.token, NonExistentId);
      const body = await response.json();

      assert.equal(response.status, 404);
    });

    it('should get an user', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await getUserById(b.token, 2);
      const body = await response.json();

      assert.equal(response.status, 200);
      assert.equal(body.id !== 0, true);
    });
  });

  describe('Update user', () => {
    const editOne = {
      email: 'to-edit-2-edited@example.com',
    };
    const editTwo = {
      email: 'to-edit-3-edited@example.com',
      password: 'changed',
      role: 'PEOPLE',
    };

    it('should NOT update an user if it is not logged in', async () => {
      const response = await updateUser('', 3, {});
      const body = await response.json();

      assert.equal(response.status, 401);
    });

    it('should NOT update an user if it is not ADMIN', async () => {
      const res = await login('films@example.com', '123456789');
      const b = await res.json();

      const response = await updateUser(b.token, 3, editOne);
      const body = await response.json();

      assert.equal(response.status, 403);
    });

    it('should NOT update an user if it does not exists', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await updateUser(b.token, NonExistentId, editOne);
      const body = await response.json();

      assert.equal(response.status, 404);
    });

    it('should NOT update an user if request is emtpy', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await updateUser(b.token, 3, {});
      const body = await response.json();

      assert.equal(response.status, 400);
    });

    it('should update only one field', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await updateUser(b.token, 3, editOne);
      const body = await response.json();

      assert.equal(response.status, 200);
    });

    it('should update all the fields', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();
      const response = await updateUser(b.token, 4, editTwo);
      const body = await response.json();

      assert.equal(response.status, 200);
    });
  });

  describe('Delete user', () => {
    const request = {
      users: [
        { id: 5 }, 
        { id: 6 }, 
      ]
    };

    it('should NOT delete an user if it is not logged in', async () => {
      const response = await deleteUsers('', request);
      const body = await response.json();

      assert.equal(response.status, 401);
    });

    it('should NOT delete an user if it is not ADMIN', async () => {
      const res = await login('films@example.com', '123456789');
      const b = await res.json();

      const response = await deleteUsers(b.token, request);
      const body = await response.json();

      assert.equal(response.status, 403);
    });

    it('should NOT delete an user if request is emtpy', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();

      const response = await deleteUsers(b.token, {});
      const body = await response.json();

      assert.equal(response.status, 400);
    });

    it('should delete some users', async () => {
      const res = await login(AdminEmail, AdminPassword);
      const b = await res.json();

      const response = await deleteUsers(b.token, request);
      const body = await response.json();

      assert.equal(response.status, 200);

      const r2 = await getUserById(b.token, request.users[0].id);
      const b2 = await r2.json();

      assert.equal(r2.status, 404);
    });
  });
});
