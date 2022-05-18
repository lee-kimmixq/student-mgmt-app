import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LogoutButton({ setIsUserLoggedIn }) {
  const handleLogout = async () => {
    await axios.delete('/api/logout');
    setIsUserLoggedIn(false);
  };

  return (
    <span className="hidden sm:block">
      <a
        href="/"
        className="block p-6 border-b-4 border-transparent hover:border-red-700"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon="fas fa-door-open" />

        <span className="sr-only">Logout</span>
      </a>
    </span>
  );
}
