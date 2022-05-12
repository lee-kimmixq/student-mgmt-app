import React, { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import LogoutButton from './components/LogoutButton.jsx';
import SignupForm from './components/SignupForm.jsx';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <div>
      {!isUserLoggedIn && <SignupForm setIsUserLoggedIn={setIsUserLoggedIn} />}
      {!isUserLoggedIn && <LoginForm setIsUserLoggedIn={setIsUserLoggedIn} />}
      {isUserLoggedIn && <div>Logged In</div>}
      {isUserLoggedIn && <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />}
    </div>
  );
}
