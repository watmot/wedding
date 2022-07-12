import axios from 'axios';

async function logIn({ username, password }) {
  try {
    const res = await axios({
      method: 'post',
      data: { username, password },
      withCredentials: true,
      url: 'http://localhost:5000/auth/login'
    });
    return res.data;
  } catch (err) {
    const message = err.response.data.message;
    return { error: message };
  }
}

async function logOut() {
  try {
    const res = await axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:5000/auth/logout'
    });
    return res.data;
  } catch (err) {
    const message = err.response.data.message;
    return { error: message };
  }
}

async function getUser() {
  try {
    const res = await axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user'
    });
    return res.data;
  } catch (err) {
    const message = err.response.data.message;
    return { error: message };
  }
}

export { logIn, logOut, getUser };
