import { useEffect, useState } from 'react';

import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    await auth.logIn({ username: loginUsername, password: loginPassword });
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/rsvp');
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <div>Login</div>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </>
  );
}

export default Login;
