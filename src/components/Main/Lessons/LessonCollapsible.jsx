import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LessonDetails from './LessonDetails.jsx';

export default function LessonCollapsible({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <>
        <tr key={lesson.id} className="hover" onClick={() => setIsVisible(!isVisible)}>
          <td>{moment(lesson.lessonDate).format('MMM Do YYYY')}</td>
          <td>{lesson.studentName}</td>
          <td>
            <FontAwesomeIcon icon="far fa-message" />
            {' '}
            {lesson.commentCount}
            {' '}
            {lesson.recentCommentDate
      && `(${moment(lesson.recentCommentDate.createdAt).fromNow()})` }
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <LessonDetails lessonId={lesson.id} />
          </td>
        </tr>
      </>
    );
  }
  return (
    <tr key={lesson.id} className="hover" onClick={() => setIsVisible(!isVisible)}>
      <td>{moment(lesson.lessonDate).format('MMM Do YYYY')}</td>
      <td>{lesson.studentName}</td>
      <td>
        <FontAwesomeIcon icon="far fa-message" />
        {' '}
        {lesson.commentCount}
        {' '}
        {lesson.recentCommentDate
      && `(${moment(lesson.recentCommentDate.createdAt).fromNow()})` }
      </td>
    </tr>
  );
}
