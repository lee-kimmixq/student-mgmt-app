import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mutate } from 'swr';
import LessonDetails from './LessonDetails.jsx';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function LessonCollapsible({ lesson, isActionMode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/lesson/${lesson.id}/comments`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      const response = await axios.delete(`/api/lesson/${lesson.id}`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (response.data.success) {
        mutate(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Col might not be the best naming
  const commentCol = (
    <td>
      <FontAwesomeIcon icon="far fa-message" />
      {' '}
      {lesson.commentCount}
      {' '}
      <span className="text-xs">
        <em>
          {lesson.recentCommentDate
      && `(${moment(lesson.recentCommentDate.createdAt).fromNow()})` }

        </em>

      </span>
    </td>
  );

  const actionCol = (
    <td>
      <button type="button" className="btn btn-xs btn-info" onClick={() => { setIsVisible(true); setIsEditMode(true); }}>Edit</button>
      <button type="button" className="btn btn-xs btn-error" onClick={handleDelete}>Delete</button>
    </td>
  );

  const lessonRow = (
    <tr key={lesson.id} className="hover" onClick={() => setIsVisible(!isVisible)}>
      <td>{moment(lesson.lessonDate).format('MMM Do YYYY')}</td>
      <td>{lesson.studentName}</td>
      { isActionMode ? actionCol : commentCol }
    </tr>
  );

  if (isVisible) {
    return (
      <>
        {lessonRow}
        <tr>
          <td colSpan="3">
            <div className="flex justify-center">
              <LessonDetails lessonId={lesson.id} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
            </div>
          </td>
        </tr>
      </>
    );
  }
  return lessonRow;
}
