import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LoginForm({ setIsUserLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [alertVisibility, setAlertVisibility] = useState('hidden');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleUsernameChange = (e) => {
    setUsernameMessage('');
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordMessage('');
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertVisibility('hidden');
    if (!username || !password) {
      setUsernameMessage(username ? '' : 'Please fill in your username!');
      setPasswordMessage(password ? '' : 'Please fill in your password!');
      return;
    }
    try {
      const { data } = await axios.post('/api/login', { username, password });
      if (data.login) {
        setIsUserLoggedIn(true);
      }
    } catch (err) {
      if (err.response.data === 'Wrong username or password') {
        setAlertVisibility('visible');
      }
    }
  };

  return (
    <div>
      <div className={`${alertVisibility} alert alert-error shadow-lg`}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Wrong username or password!</span>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Con Brio</h1>
            <p className="py-6">Sign in to your account</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="input input-bordered"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{usernameMessage}</p>
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={passwordType}
                    id="password"
                    value={password}
                    className="input input-bordered"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                  />
                  <button type="button" className="absolute top-1/4 right-3" onClick={togglePasswordType}>
                    <FontAwesomeIcon icon="far fa-eye" />
                  </button>
                </div>
                <p className="text-xs italic text-rose-600 leading-8 indent-2">{passwordMessage}</p>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
              </div>
              <p className="text-sm text-center text-gray-500">
                No account?
                {' '}
                <u><Link to="/signup">Sign up</Link></u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
