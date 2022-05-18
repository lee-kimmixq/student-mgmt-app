import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import StudentsList from './StudentsList.jsx';
import LessonsList from './LessonsList.jsx';
import LessonForm from './LessonForm.jsx';
import TeacherForm from './TeacherForm.jsx';
import Navbar from './Navbar.jsx';

export default function Dashboard({ setIsUserLoggedIn, accountType }) {
  return (
    <div>
      <Navbar setIsUserLoggedIn={setIsUserLoggedIn} accountType={accountType} />
      <br />
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
