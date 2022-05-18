import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarParentButtons({ setIsUserLoggedIn }) {
  return (

    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <Link to="/students">
          Students
        </Link>
      </li>
      <li>
        <Link to="/lessons">
          Lessons
        </Link>
      </li>
      <li><Link to="/find-teacher">Add New Teacher</Link></li>
    </ul>
  );
}
