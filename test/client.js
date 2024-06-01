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

module.exports = {
  login,
  register,
  getUsers,
};
