import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx';
import StudentsList from './StudentsList.jsx';
import LessonsList from './LessonsList.jsx';
import LessonForm from './LessonForm.jsx';
import TeacherForm from './TeacherForm.jsx';

export default function Dashboard({ setIsUserLoggedIn, accountType }) {
  return (
    <div>
      <LogoutButton setIsUserLoggedIn={setIsUserLoggedIn} />
      <br />
      {accountType === 'teacher' && (<Link to="/students">View List of Students</Link>)}
      <Link to="/lessons">View List of Lesson Logs</Link>
      {accountType === 'teacher' && <Link to="/new-lesson">Create Log</Link>}
      {accountType === 'parent' && <Link to="/find-teacher">Add New Teacher</Link>}
      <Routes>
        <Route path="students" element={<StudentsList />} />
        <Route path="lessons" element={<LessonsList />} />
        <Route path="new-lesson" element={<LessonForm />} />
        <Route path="find-teacher" element={<TeacherForm />} />
      </Routes>
    </div>
  );
}
