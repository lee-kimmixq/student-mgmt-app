import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [passwordType, setPasswordType] = useState('password');

  const handleUsernameChange = (e) => {
    setUsernameMessage('');
    setUsername(e.target.value);
  };

  const checkValidUsername = async () => {
    const { data } = await axios.get(`/api/signup/check-username?username=${username}`, { username });
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
    setPasswordMessage('');
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayNameMessage('');
    setDisplayName(e.target.value);
  };

  const handleAccountTypeChange = (e) => {
    setAccountTypeMessage('');
    setAccountType(e.target.id);
  };

  const togglePasswordType = () => {
    const newType = passwordType === 'password' ? 'text' : 'password';
    setPasswordType(newType);
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
      const { data } = await axios.post('/api/signup', {
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
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Con Brio</h1>

          <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            Some introduction text
          </p>

          <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
            <p className="text-lg font-medium">Sign up for a new account</p>

            {successMessage && (
            <div
              className="p-4 text-green-700 border-l-4 border-green-700 bg-green-50"
              role="alert"
            >
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
            )}

            <form>
              <div>
                <label htmlFor="username" className="text-sm font-medium">Username</label>

                <div className="relative mt-1">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Enter username"
                    onBlur={checkValidUsername}
                  />
                </div>
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{usernameMessage}</p>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium">Password</label>

                <div className="relative mt-1">
                  <input
                    type={passwordType}
                    id="password"
                    value={password}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                  />

                  <button type="button" className="absolute inset-y-0 inline-flex items-center right-4" onClick={togglePasswordType}>
                    <FontAwesomeIcon icon="far fa-eye" />
                  </button>
                </div>
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{passwordMessage}</p>
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-sm font-medium"> Confirm Password</label>

                <div className="relative mt-1">
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Enter password again"
                    onChange={handleConfirmPasswordChange}
                  />

                </div>
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{passwordMessage}</p>
              </div>

              <div>
                <label htmlFor="display-name" className="text-sm font-medium">Display Name</label>

                <div className="relative mt-1">
                  <input
                    type="text"
                    id="display-name"
                    value={displayName}
                    onChange={handleDisplayNameChange}
                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    placeholder="Enter display name"
                  />
                </div>
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{displayNameMessage}</p>
              </div>

              <div>
                <label htmlFor="account-type" className="text-sm font-medium">Account Type</label>

                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                  <div>
                    <input className="sr-only" id="parent" name="account-type" type="radio" />
                    <label htmlFor="parent" id="parent" className={accountType === 'parent' ? 'block w-full p-3 border border-2 border-indigo-600 rounded-lg text-sm font-medium' : 'block w-full p-3 border border-gray-200 rounded-lg text-sm font-medium'} onClick={(e) => { handleAccountTypeChange(e); }}>
                      Parent
                    </label>
                  </div>

                  <div>
                    <input className="sr-only" id="teacher" name="account-type" type="radio" />
                    <label htmlFor="teacher" id="teacher" className={accountType === 'teacher' ? 'block w-full p-3 border border-2 border-indigo-600 rounded-lg text-sm font-medium' : 'block w-full p-3 border border-gray-200 rounded-lg text-sm font-medium'} onClick={(e) => { handleAccountTypeChange(e); }}>
                      Teacher
                    </label>
                  </div>
                </div>
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{accountTypeMessage}</p>
              </div>
              <br />
              <button type="submit" onClick={handleSignup} className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">Sign Up</button>
            </form>
            <p className="text-sm text-center text-gray-500">
              Already have an account?
              {' '}
              <u><Link to="/">Log In</Link></u>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/*
return (
    <div>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Con Brio</h1>

          <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            Some introduction text
          </p>

          <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
            <p className="text-lg font-medium">Sign in to your account</p>

            <div className={`${alertVisibility} p-4 text-red-700 border-l-4 border-red-700 bg-red-50`} role="alert">
              <p className="text-sm font-medium">Wrong username or password!</p>
            </div>

            <div>
              <label htmlFor="username" className="text-sm font-medium">Username</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="username"
                  onChange={handleUsernameChange}
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter username"
                />
              </div>
              <p className="text-xs italic text-rose-600 leading-8 indent-2">{usernameMessage}</p>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>

              <div className="relative mt-1">
                <input
                  type={passwordType}
                  id="password"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                />

                <button type="button" className="absolute inset-y-0 inline-flex items-center right-4" onClick={togglePasswordType}>
                  <FontAwesomeIcon icon="far fa-eye" />
                </button>
              </div>
              <p className="text-xs italic text-rose-600 leading-8 indent-2">{passwordMessage}</p>
            </div>

            <button type="submit" onClick={handleLogin} className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
              Sign in
            </button>

            <p className="text-sm text-center text-gray-500">
              No account?
              {' '}
              <u><Link to="/signup">Sign up</Link></u>
            </p>
          </form>
        </div>
      </div>
    </div>
  );

*/
