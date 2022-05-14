import React, { useState, useEffect } from 'react';
import moment from 'moment';

import LessonEditForm from './LessonEditForm.jsx';

export default function LessonDetails({ lesson }) {
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditMode) {
    return (
      <LessonEditForm lesson={lesson} setIsEditMode={setIsEditMode} />
    );
  }
  return (
    <div>
      <p>
        Date:
        {' '}
        {moment(lesson.lessonDate).format('MMM Do YYYY HH:mm')}
      </p>
      <p>
        Student:
        {' '}
        {lesson.studentName}
      </p>
      <p>
        Details:
        {' '}
        {lesson.details}
      </p>
      <p>
        Created
        {' '}
        {moment(lesson.createdAt).fromNow()}
        , last edited
        {' '}
        {moment(lesson.updatedAt).fromNow()}
      </p>
      <button type="button" onClick={() => { setIsEditMode(true); }}>Edit</button>
    </div>
  );
}
