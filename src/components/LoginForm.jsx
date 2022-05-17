import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoginForm({ setIsUserLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordType = () => {
    const newType = passwordType === 'password' ? 'text' : 'password';
    setPasswordType(newType);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login', { username, password });
      if (data.login === true) {
        setIsUserLoggedIn(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Con Brio</h1>

        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Some introduction text
        </p>

        <form action="" className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
          <p className="text-lg font-medium">Sign in to your account</p>

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
  );
}
