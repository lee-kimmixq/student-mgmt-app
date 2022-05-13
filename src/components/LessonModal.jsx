import React, { useState } from 'react';
import moment from 'moment';

export default function LessonModal({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

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
