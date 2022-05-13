import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx';
import StudentsList from './StudentsList.jsx';

export default function Dashboard({ setIsUserLoggedIn }) {
  return (
    <div>
      Logged In
      <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />
      <Link to="/students">View List of Students</Link>
      <Routes>
        <Route path="students" element={<StudentsList />} />
      </Routes>
    </div>
  );
}
