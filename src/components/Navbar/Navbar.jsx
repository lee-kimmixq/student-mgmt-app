import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarTeacherButtons from './NavbarTeacherButtons.jsx';
import NavbarParentButtons from './NavbarParentButtons.jsx';
import LogoutButton from './LogoutButton.jsx';

export default function NavBar({ setIsUserLoggedIn, accountType }) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon="fas fa-bars" />
          </label>
          {accountType === 'teacher' && (<NavbarTeacherButtons setIsUserLoggedIn={setIsUserLoggedIn} />)}
          {accountType === 'parent' && (<NavbarParentButtons setIsUserLoggedIn={setIsUserLoggedIn} />)}
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Con Brio</a>
      </div>
      <div className="navbar-end">

        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <FontAwesomeIcon icon="fas fa-circle-user" />
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} /></li>
          </ul>
        </div>
      </div>
    </div>

  );
}
