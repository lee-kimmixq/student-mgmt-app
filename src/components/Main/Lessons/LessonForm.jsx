import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function LessonForm() {
  const [studentList, setStudentList] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [studentMessage, setStudentMessage] = useState('');
  const [details, setDetails] = useState('');
  const [detailsMessage, setDetailsMessage] = useState('');
  const [date, setDate] = useState('');
  const [dateMessage, setDateMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(async () => {
    try {
      const { data } = await axios.get('/api/students/active', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      const studentsJsx = data.map((el) => (
        <option key={el.id} value={el.id}>
          {el.studentName}
        </option>
      ));
      setStudentList(studentsJsx);
    } catch (err) {
      console.log(err.response.data);
    }
  }, []);

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // TODO: date validation

  const checkBlank = () => {
    let hasBlank = false;
    if (studentId === '') {
      setStudentMessage('Please choose a student');
      hasBlank = true;
    }
    if (details === '') {
      setDetailsMessage('Please fill the lesson details');
      hasBlank = true;
    }
    if (date === '') {
      setDateMessage('Please fill in the date');
      hasBlank = true;
    }
    return hasBlank;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkBlank()) return;
    try {
      const { data } = await axios.post('/api/lessons', {
        studentId, details, date,
      }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (data.success) {
        setSuccessMessage('Logged lesson successfully!');
        setStudentId('');
        setDate('');
        setDetails('');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />
        <span>{dateMessage}</span>
        <br />
        <label htmlFor="student-id">Student:</label>
        <select id="student-id" onChange={handleStudentIdChange} value={studentId}>
          <option value="">Choose Student</option>
          {studentList}
        </select>
        <span>{studentMessage}</span>
        <br />
        <label htmlFor="details">Details:</label>
        <textarea type="text" id="details" value={details} onChange={handleDetailsChange} />
        <span>{detailsMessage}</span>
        <br />
        <button type="submit" onClick={handleSubmit}>Submit Lesson Log</button>
      </form>
      {successMessage}
    </div>
  );
}
