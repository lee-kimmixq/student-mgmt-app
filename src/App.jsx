import React, { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import LogoutButton from './components/LogoutButton.jsx';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <div>
      {!isUserLoggedIn && <LoginForm setIsUserLoggedIn={setIsUserLoggedIn} />}
      {isUserLoggedIn && <div>Logged In</div>}
      {isUserLoggedIn && <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />}
    </div>
  );
}
