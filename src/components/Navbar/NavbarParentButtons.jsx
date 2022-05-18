import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoutButton from './LogoutButton.jsx';

export default function NavbarParentButtons({ setIsUserLoggedIn }) {
  return (

    <div className="flex items-center ml-8">
      <div
        className="flex items-center border-gray-100 divide-x divide-gray-100 border-x"
      >

        <Link to="/lessons">
          <span className="block p-6 border-b-4 border-transparent hover:border-red-700">
            <FontAwesomeIcon icon="fas fa-clipboard-list" />
          </span>
        </Link>

        <Link to="/">
          <span className="block p-6 border-b-4 border-transparent hover:border-red-700">
            <FontAwesomeIcon icon="fas fa-circle-user" />
          </span>
        </Link>

        <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />
      </div>
    </div>
  );
}