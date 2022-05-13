import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginMain from './components/LoginMain.jsx';
import Dashboard from './components/Dashboard.jsx';

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
        {isUserLoggedIn && <Dashboard />}
      </div>
    </BrowserRouter>
  );
}
