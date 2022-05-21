import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function LogoutButton({ setIsUserLoggedIn }) {
  const handleLogout = async () => {
    await axios.delete('/api/logout');
    setIsUserLoggedIn(false);
      <Redirect to="/" />;
  };

  return (
    <a onClick={handleLogout}>
      Logout
    </a>
  );
}
