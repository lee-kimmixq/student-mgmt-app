import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LessonModal({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/lesson/${lesson.id}`);
      if (data.success) {
        navigate('/');
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  if (isVisible) {
    return (
      <div className="modal-container">
        <div className="modal">
          <button type="button" className="modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
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
            <button type="button" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setIsVisible(true)}>
      View
    </button>
  );
}
