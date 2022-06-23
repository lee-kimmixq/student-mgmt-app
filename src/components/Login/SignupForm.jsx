import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// signup form is within the Login folder, seems not right :)!

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
  const [successVisibility, setSuccessVisibility] = useState('hidden');

  const handleUsernameChange = (e) => {
    setUsernameMessage('');
    setUsername(e.target.value);
  };

  const checkValidUsername = async () => {
    if (!username) {
      setUsernameMessage('Please fill in your username');
      return;
    }
    const { data } = await axios.get(`/api/signup/check-username?username=${username}`, { username });
    const message = data.isValidUsername ? 'Valid username' : 'Username already taken';
    setUsernameMessage(message);
  };

  // this function could be defined outside of your component
  const checkPasswordMatch = async (pw1, pw2) => {
    const isMatch = pw1 === pw2;
    const message = isMatch ? '' : 'Passwords do not match';
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

  // i think you could give the inputs the required attribute to utilize html validation
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
    setSuccessVisibility('hidden');
    if (checkBlank() || !checkPasswordMatch()) return;
    try {
      const { data } = await axios.post('/api/signup', {
        username, password, displayName, accountType,
      });
      if (data.signup) {
        // could probably write a function to reset everything here, but personal preference I guess. This will always be somewhat sub-par if we don't use a good form library.
        setSuccessVisibility('visible');
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
    <div className="relative hero bg-base-200">

      <div className={`${successVisibility} fixed inset-x-0 top-0 z-50 alert alert-success shadow-lg flex justify-center`}>
        <div>
          <FontAwesomeIcon icon="fas fa-circle-check" />
          <span>
            Successfully signed up! Please log in
            {' '}
            <Link to="/"><u>here</u></Link>
            .
          </span>
        </div>
      </div>

      <div className="absolute top-20 hero-content flex-col">

        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Con Brio</h1>
        </div>

        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
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
                onBlur={checkValidUsername}
              />
              <p className={usernameMessage === 'Valid username' ? 'text-xs italic text-blue-700 leading-8 indent-2' : 'text-xs italic text-rose-600 leading-8 indent-2'}>{usernameMessage}</p>
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="input input-bordered"
                placeholder="Enter password"
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-control">
              <label htmlFor="confirm-password" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                className="input input-bordered"
                placeholder="Enter password again"
                onChange={handleConfirmPasswordChange}
              />
              <p className="text-xs italic text-rose-600 leading-8 indent-2">{passwordMessage}</p>
            </div>

            <div className="form-control">
              <label htmlFor="display-name" className="label">
                <span className="label-text">Display Name</span>
              </label>
              <input
                type="text"
                id="display-name"
                value={displayName}
                onChange={handleDisplayNameChange}
                className="input input-bordered"
                placeholder="Enter display name"
              />
              <p className="text-xs italic text-rose-600 leading-8 indent-2">{displayNameMessage}</p>
            </div>

            <div className="form-control">
              <label htmlFor="display-name" className="label">
                <span className="label-text">Account Type</span>
              </label>

              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                <div>
                  <input className="sr-only" id="parent" name="account-type" type="radio" />
                  {/* these on click handlers are not fully necessary actually if you are using an anonymous function already. You could just directly call your desired functions. 
                  change onClick={(e) => { handleAccountTypeChange(e); to
                  
                    onClick={(e) => { 
                        setAccountTypeMessage('');
                        setAccountType(e.target.id);
                      }
                    }
                  
                  */}
                  <label htmlFor="parent" id="parent" className={accountType === 'parent' ? 'btn  btn-outline btn-sm' : 'btn btn-ghost btn-sm'} onClick={(e) => { handleAccountTypeChange(e); }}>
                    Parent
                  </label>
                </div>

                <div>
                  <input className="sr-only" id="teacher" name="account-type" type="radio" />
                  <label htmlFor="teacher" id="teacher" className={accountType === 'teacher' ? 'btn  btn-outline btn-sm' : 'btn btn-ghost btn-sm'} onClick={(e) => { handleAccountTypeChange(e); }}>
                    Teacher
                  </label>
                </div>
              </div>
              <p className="text-xs italic text-rose-600 leading-8 indent-2">{accountTypeMessage}</p>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-warning" onClick={handleSignup}>Sign Up</button>
            </div>

            <p className="text-sm text-center text-gray-500">
              Already have an account?
              {' '}
              <u><Link to="/">Log In</Link></u>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

// could still consider moving the different form fields into their own respective components, but not fully required!