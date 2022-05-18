import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarTeacherButtons from './NavbarTeacherButtons.jsx';
import NavbarParentButtons from './NavbarParentButtons.jsx';

export default function NavBar({ setIsUserLoggedIn, accountType }) {
  return (
    <header className="border-b border-gray-100">
      <div
        className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
      >
        <div className="flex items-center">
          <button type="button" className="p-2 sm:mr-4 lg:hidden">
            <FontAwesomeIcon icon="fas fa-bars" />
          </button>

          <a href="/" className="flex">
            <span className="inline-block w-32 h-10 bg-gray-200 rounded-lg" />
          </a>
        </div>

        <div className="flex items-center justify-end flex-1">
          {accountType === 'teacher' && (<NavbarTeacherButtons setIsUserLoggedIn={setIsUserLoggedIn} />)}
          {accountType === 'parent' && (<NavbarParentButtons setIsUserLoggedIn={setIsUserLoggedIn} />)}

        </div>
      </div>
    </header>
  );
}
