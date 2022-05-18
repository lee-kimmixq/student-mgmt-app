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
          <nav
            className="hidden lg:uppercase lg:text-gray-500 lg:tracking-wide lg:font-bold lg:text-xs lg:space-x-4 lg:flex"
          >
            <a
              href="/about"
              className="block h-16 leading-[4rem] border-b-4 border-transparent hover:text-red-700 hover:border-current"
            >
              About
            </a>

            <a
              href="/news"
              className="block h-16 leading-[4rem] border-b-4 border-transparent hover:text-red-700 hover:border-current"
            >
              News
            </a>
          </nav>

          {accountType === 'teacher' && (<NavbarTeacherButtons setIsUserLoggedIn={setIsUserLoggedIn} />)}
          {accountType === 'parent' && (<NavbarParentButtons setIsUserLoggedIn={setIsUserLoggedIn} />)}

        </div>
      </div>
    </header>
  );
}
