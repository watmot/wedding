import { useEffect, useState } from 'react';

import axios from 'axios';

function App() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    handleGetUser();
    handleGetSession();
  }, []);

  function handleRegister() {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:5000/auth/register'
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.response.data));
  }

  function handleLogin() {
    axios({
      method: 'post',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:5000/auth/login'
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.response.data));
  }

  function handleLogout() {
    axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:5000/auth/logout'
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.response.data));
  }

  function handleGetUser() {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/user'
    })
      .then((res) => setUser(res))
      .catch((err) => console.error(err.response.data));
  }

  function handleGetSession() {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:5000/auth/session'
    })
      .then((res) => setSession(res))
      .catch((err) => console.error(err.response.data));
  }

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placholder="username" onChange={(e) => setRegisterUsername(e.target.value)} />
        <input placholder="password" onChange={(e) => setRegisterPassword(e.target.value)} />
        <button onClick={handleRegister}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input placholder="username" onChange={(e) => setLoginUsername(e.target.value)} />
        <input placholder="password" onChange={(e) => setLoginPassword(e.target.value)} />
        <button onClick={handleLogin}>Submit</button>
      </div>
      <div>
        <h1>Logout</h1>
        <button onClick={handleLogout}>Submit</button>
      </div>
      <div>
        <button onClick={handleGetUser}>Get User</button>
        <h2>{JSON.stringify(user?.data)}</h2>
      </div>
      <div>
        <button onClick={handleGetSession}>Get Session</button>
        <h2>{JSON.stringify(session?.data)}</h2>
      </div>
    </div>
  );
}

export default App;
