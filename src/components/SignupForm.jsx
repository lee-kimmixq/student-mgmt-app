import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [displayNameMessage, setDisplayNameMessage] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountTypeMessage, setAccountTypeMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const checkValidUsername = async () => {
    const { data } = await axios.get(`/signup/check-username?username=${username}`, { username });
    const message = data.isValidUsername ? 'Valid username' : 'Username already taken';
    setUsernameMessage(message);
  };

  const checkPasswordMatch = async (pw1, pw2) => {
    const isMatch = pw1 === pw2;
    const message = isMatch ? 'Match' : 'Passwords do not match';
    setPasswordMessage(message);
    return isMatch;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const checkBlank = () => {
    let hasBlank = false;
    if (username === '') {
      setUsernameMessage('Please fill in your username');
      hasBlank = true;
    }
    if (password === '') {
      setPasswordMessage('Please fill in your password');
      hasBlank = true;
    }
    if (displayName === '') {
      setDisplayNameMessage('Please fill in your display name');
      hasBlank = true;
    }
    if (accountType === '') {
      setAccountTypeMessage('Please choose an account type!');
      hasBlank = true;
    }
    return hasBlank;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (checkBlank() || !checkPasswordMatch()) return;
    try {
      const { data } = await axios.post('/signup', {
        username, password, displayName, accountType,
      });
      if (data.signup) {
        setSuccessMessage('Successfully signed up! Please log in.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setDisplayName('');
        setAccountType('');
        setUsernameMessage('');
        setPasswordMessage('');
        setDisplayNameMessage('');
        setAccountTypeMessage('');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <Link to="/">Log In</Link>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} onBlur={checkValidUsername} />
        <span>{usernameMessage}</span>
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <span>{passwordMessage}</span>
        <br />
        <label htmlFor="display-name">Display Name:</label>
        <input type="text" id="display-name" value={displayName} onChange={handleDisplayNameChange} />
        <span>{displayNameMessage}</span>
        <br />
        <label htmlFor="account-type">Account Type:</label>
        <select id="account-type" onChange={handleAccountTypeChange} value={accountType}>
          <option value="">Select Account Type</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
        </select>
        <span>{accountTypeMessage}</span>
        <br />
        <button type="submit" onClick={handleSignup}>Sign Up</button>
        <p>{successMessage}</p>
      </form>
    </div>
  );
}
