import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarTeacherButtons() {
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
      <li><Link to="/new-lesson">Create New Log</Link></li>
    </ul>
  );
}
