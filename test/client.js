const BaseUrl = 'http://0.0.0.0:3021/api/v1';

const register = async (token, email, password, role) => {
  const response = await fetch(BaseUrl + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ email, password, role }),
  });

  return response;
};

const login = async (email, password) => {
  const response = await fetch(BaseUrl + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
};

const getUsers = async (token) => {
  const response = await fetch(BaseUrl + '/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });

  return response;
};

const getUserById = async (token, id) => {
  const response = await fetch(BaseUrl + '/users/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });

  return response;
};

const updateUser = async (token, id, body) => {
  const response = await fetch(BaseUrl + '/users/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  });

  return response;
};

const deleteUsers = async (token, body) => {
  const response = await fetch(BaseUrl + '/users', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  });

  return response;
};

const ghibli = async (token, queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();

  const response = await fetch(BaseUrl + '/ghibli?' + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });

  return response;
};

module.exports = {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUsers,
  ghibli,
};
