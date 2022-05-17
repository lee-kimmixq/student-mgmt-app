import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginMain from './components/LoginMain.jsx';
import Dashboard from './components/Dashboard.jsx';
import getLoginTokenCookie from '../utils/getLoginTokenCookie.mjs';

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState('');

  useEffect(async () => {
    try {
      const { data } = await axios.get('/api/getAuth', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      setIsUserLoggedIn(data.login);
      setAccountType(data.accountType);
    } catch (err) {
      console.log(err.response.data);
    }
  });

  return (
    <BrowserRouter>
      <div>
        {!isUserLoggedIn && <LoginMain setIsUserLoggedIn={setIsUserLoggedIn} />}
        {isUserLoggedIn
        && <Dashboard setIsUserLoggedIn={setIsUserLoggedIn} accountType={accountType} />}
      </div>
    </BrowserRouter>
  );
}
