import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import useSWR, { mutate } from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonEditForm from './LessonEditForm.jsx';
import CommentsList from './CommentsList.jsx';

export default function LessonDetails({ lessonId }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: lesson, error } = useSWR([`/api/lesson/${lessonId}`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!lesson) return <div>loading</div>;

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
      <button type="button" onClick={handleDelete}>Delete</button>
      <CommentsList lessonId={lessonId} />
    </div>
  );
}
