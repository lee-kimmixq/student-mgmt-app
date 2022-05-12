import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ setIsUserLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { username, password });
      if (data.login === true) {
        setIsUserLoggedIn(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" onChange={handleUsernameChange} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" onChange={handlePasswordChange} />
      <button type="button" onClick={handleLogin}>Log In</button>
    </form>
  );
}
