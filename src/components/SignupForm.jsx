import React, { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [accountType, setAccountType] = useState('parent');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const checkValidUsername = async () => {
    const { data } = await axios.get(`/signup/check-username?username=${username}`, { username });
    const message = data.isValidUsername ? 'Valid username' : 'Username already taken';
    setUsernameMessage(message);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/signup', {
        username, password, displayName, accountType,
      });
      if (data.signup === true) {
        setSuccessMessage('Successfully signed up! Please log in.');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" onChange={handleUsernameChange} onBlur={checkValidUsername} />
      <span>{usernameMessage}</span>
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" onChange={handlePasswordChange} />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input type="confirm-password" id="confirm-password" onChange={handlePasswordChange} />
      <br />
      <label htmlFor="display-name">Display Name:</label>
      <input type="text" id="display-name" onChange={handleDisplayNameChange} />
      <br />
      <label htmlFor="account-type">Account Type:</label>
      <select id="account-type" onChange={handleAccountTypeChange}>
        <option value="parent">Parent</option>
        <option value="teacher">Teacher</option>
      </select>
      <br />
      <button type="submit" onClick={handleSignup}>Sign Up</button>
      <p>{successMessage}</p>
    </form>
  );
}
