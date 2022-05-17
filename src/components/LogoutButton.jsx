import React from 'react';
import axios from 'axios';

export default function LogoutButton({ setIsUserLoggedIn }) {
  const handleLogout = async () => {
    await axios.delete('/api/logout');
    setIsUserLoggedIn(false);
  };

  return (
    <button type="button" onClick={handleLogout}>Log Out</button>
  );
}
