import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
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
      // definitely could write a util function to get the header object with the token, since you use the same code here as well
      const { data } = await axios.get('/api/students/active', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      const studentsJsx = data.map((el) => (
        <option key={el.id} value={el.id}>
          {el.studentName}
        </option>
      ));
      // setting Jsx into state seems a bit odd to me. I would rather keep the raw data in state, and then map it when necessary. Without typescript i wouldn't know what the jsx should look like, and overwriting etc. might be easy. Since you use SWR in another place, you could use it here as well by the way.
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

  // nice to keep todos but from experience todos in comment format will never be touched again :D!
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
        mutate(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="form-control flex items-center justify-center px-8">
      <form>
        <label htmlFor="date" className="label">Date</label>
        <input type="date" id="date" className="input input-bordered" value={date} onChange={handleDateChange} />
        <span>{dateMessage}</span>
        <br />
        <label htmlFor="student-id" className="label">Student</label>
        <select id="student-id" className="select select-bordered" onChange={handleStudentIdChange} value={studentId}>
          <option value="">Choose Student</option>
          {studentList}
        </select>
        <span>{studentMessage}</span>
        <br />
        <label htmlFor="details" className="label">Details</label>
        <textarea rows="500" cols="200" type="text" id="details" className="input input-bordered w-full" value={details} onChange={handleDetailsChange} />
        <span>{detailsMessage}</span>
        <br />
        <button type="submit" className="btn btn-sm btn-warning" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
