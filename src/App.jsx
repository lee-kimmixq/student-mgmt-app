import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginMain from './components/LoginMain.jsx';
import LogoutButton from './components/LogoutButton.jsx';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(async () => {
    try {
      const { data } = await axios.get('/checkAuth');
      console.log(data);
      setIsUserLoggedIn(data.login);
    } catch (err) {
      console.log(err.response.data);
    }
  });

  return (
    <BrowserRouter>
      <div>
        {!isUserLoggedIn && <LoginMain setIsUserLoggedIn={setIsUserLoggedIn} />}
        {isUserLoggedIn && (
        <div>
          Logged In
          <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />
        </div>
        )}
      </div>
    </BrowserRouter>
  );
}
