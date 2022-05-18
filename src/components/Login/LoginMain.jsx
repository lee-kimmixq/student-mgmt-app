import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default function LoginMain({ setIsUserLoggedIn }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route path="signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}
