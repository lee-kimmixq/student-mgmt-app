import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginMain from './components/LoginMain.jsx';
import LogoutButton from './components/LogoutButton.jsx';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div>
        {!isUserLoggedIn && <LoginMain setIsUserLoggedIn={setIsUserLoggedIn} />}
        {isUserLoggedIn && <div>Logged In</div>}
        {isUserLoggedIn && <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />}
      </div>
    </BrowserRouter>
  );
}
