import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import LoginMain from './components/Login/LoginMain.jsx';
import Main from './components/Main/Main.jsx';
import getLoginTokenCookie from '../utils/getLoginTokenCookie.mjs';

library.add(fas, far);

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
      <div className="flex items-center justify-center">
        <div className="mockup-phone">
          <div className="camera" />
          <div className="display">
            <div className="artboard phone-5 white-bg overflow-y-scroll">
              <div>
                {!isUserLoggedIn && <LoginMain setIsUserLoggedIn={setIsUserLoggedIn} />}
                {isUserLoggedIn
        && <Main setIsUserLoggedIn={setIsUserLoggedIn} accountType={accountType} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
