import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx';
import StudentsList from './StudentsList.jsx';
import LessonsList from './LessonsList.jsx';
import LessonForm from './LessonForm.jsx';

export default function Dashboard({ setIsUserLoggedIn }) {
  return (
    <div>
      Logged In
      <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />
      <Link to="/students">View List of Students</Link>
      <Link to="/lessons">View List of Lesson Logs</Link>
      <Link to="/new-lesson">Create Log</Link>
      <Routes>
        <Route path="students" element={<StudentsList />} />
        <Route path="lessons" element={<LessonsList />} />
        <Route path="new-lesson" element={<LessonForm />} />
      </Routes>
    </div>
  );
}
