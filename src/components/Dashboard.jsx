import React from 'react';
import LogoutButton from './LogoutButton.jsx';

export default function Dashboard({ setIsUserLoggedIn }) {
  return (
    <div>
      Logged In
      <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />
    </div>
  );
}
