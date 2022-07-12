import axios from 'axios';
import { useState } from 'react';

function Admin() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  function handleRegister() {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword,
        role: isAdmin ? 'admin' : 'user'
      },
      withCredentials: true,
      url: 'http://localhost:5000/auth/register'
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err.response.data));

    setRegisterUsername('');
    setRegisterPassword('');
  }

  return (
    <>
      <div>Register</div>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        value={registerUsername}
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <label htmlFor="admin">Admin</label>
      <input
        type="checkbox"
        name="admin"
        checked={isAdmin}
        onChange={(e) => {
          setIsAdmin(e.target.checked);
        }}
      />
      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Admin;
