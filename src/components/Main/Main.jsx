import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentsList from './Students/StudentsList.jsx';
import LessonsList from './Lessons/LessonsList.jsx';
import LessonForm from './Lessons/LessonForm.jsx';
import TeacherForm from './Teachers/TeacherForm.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import TeachersList from './Teachers/TeachersList.jsx';
import InvoicesList from './Invoices/InvoicesList.jsx';

export default function Main({ setIsUserLoggedIn, accountType }) {
  return (
    <div>
      <Navbar setIsUserLoggedIn={setIsUserLoggedIn} accountType={accountType} />
      <br />
      <Routes>
        <Route path="students" element={<StudentsList />} />
        <Route path="teachers" element={<TeachersList />} />
        <Route path="lessons" element={<LessonsList />} />
        <Route path="new-lesson" element={<LessonForm />} />
        <Route path="find-teacher" element={<TeacherForm />} />
        <Route path="invoices" element={<InvoicesList />} />
      </Routes>
    </div>
  );
}
