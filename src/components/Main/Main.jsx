import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import StudentsList from './Students/StudentsList.jsx';
import LessonsList from './Lessons/LessonsList.jsx';
import LessonForm from './Lessons/LessonForm.jsx';
import TeacherForm from './Teachers/TeacherForm.jsx';
import Navbar from '../Navbar/Navbar.jsx';

export default function Main({ setIsUserLoggedIn, accountType }) {
  return (
    <div>
      <Navbar setIsUserLoggedIn={setIsUserLoggedIn} accountType={accountType} />
      <br />
      <Routes>
        <Route path="students" element={<StudentsList />} />
        <Route path="lessons" element={<LessonsList />} />
        <Route path="new-lesson" element={<LessonForm />} />
        <Route path="find-teacher" element={<TeacherForm />} />
      </Routes>
    </div>
  );
}
