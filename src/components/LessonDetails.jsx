import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import LessonEditForm from './LessonEditForm.jsx';

export default function LessonDetails({ lesson }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get(`/lesson/${lesson.id}/comments`);
      console.log(data);
      const commentsJsx = data.map((comment) => (
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
      setCommentsList(commentsJsx);
    } catch (err) {
      console.log(err.response.data);
    }
  }, []);

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
      <h4>Comments</h4>
      <div>
        {commentsList}
      </div>
    </div>
  );
}
