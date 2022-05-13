import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import LessonModal from './LessonModal.jsx';

export default function LessonsList() {
  const [lessons, setLessons] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get('/lessons');
      console.log(data);
      setLessons(data);
    } catch (err) {
      console.log(err.response.data);
    }
  }, []);

  const lessonsList = lessons.map((lesson) => (
    <li key={lesson.id}>
      {moment(lesson.lessonDate).format('MMM Do YYYY')}
      {' '}
      |
      {' '}
      {lesson.studentName}
      <LessonModal lesson={lesson} />
    </li>
  ));

  return (
    <div>
      <ul>
        {lessonsList}
      </ul>
    </div>
  );
}
