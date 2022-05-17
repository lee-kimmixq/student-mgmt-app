import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher.mjs';

import LessonModal from './LessonModal.jsx';

export default function LessonsList() {
  const { data, error } = useSWR('/lessons', fetcher);

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  const lessonsList = data.map((lesson) => (
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
