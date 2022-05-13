import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get('/students');
      setStudents(data);
    } catch (err) {
      console.log(err.response.data);
    }
  }, []);

  const studentsList = students.map((student) => (
    <li key={student.id}>
      {student.studentName}
      {' '}
      | $
      {student.lessonRate}
      {' '}
      |
      {' '}
      {student.status}
      {' '}
    </li>
  ));

  return (
    <div>
      <ul>
        {studentsList}
      </ul>
    </div>
  );
}
