import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LogoutButton({ setIsUserLoggedIn }) {
  const handleLogout = async () => {
    await axios.delete('/api/logout');
    setIsUserLoggedIn(false);
  };

  return (
    <a onClick={handleLogout}>
      Logout
    </a>
  );
}
