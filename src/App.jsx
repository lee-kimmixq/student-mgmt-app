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
          <div className="camera -z-50" />
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

// I saw that you divided the routes inbetween multiple files. This might get confusing and hard to work with in the future. Ideally Routes are all defined in one place, preferably the top-level of your app

// Nicely coded. Mostly clean. I think can improve the readability a bit more by improving on your usage of your if conditions, by using enums and by reducing the amount of ternary operators. Using tables instead of flex/grid was not the best move I think, but also not too bad to see how websites were styled 20 years ago :D!