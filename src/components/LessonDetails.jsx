import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import useSWR, { mutate } from 'swr';
import fetcher from '../../utils/fetcher.mjs';

import LessonEditForm from './LessonEditForm.jsx';
import CommentForm from './CommentForm.jsx';

export default function LessonDetails({ lesson }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, error } = useSWR(`/api/lesson/${lesson.id}/comments`, fetcher);

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  const commentsList = data.map((comment) => (
    <div key={comment.id}>
      <p>
        {comment.displayName}
        :
        {' '}
        {comment.content}
        {' '}
        (
        {moment(comment.createdAt).fromNow()}
        )
      </p>
    </div>
  ));

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/lesson/${lesson.id}/comments`);
      const response = await axios.delete(`/api/lesson/${lesson.id}`);
      if (response.data.success) {
        mutate('/api/lessons');
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
      <h4>Comments</h4>
      <div>
        {commentsList}
      </div>
      <CommentForm lesson={lesson} />
    </div>
  );
}
