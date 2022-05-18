import React, { useState } from 'react';

import LessonDetails from './LessonDetails.jsx';

export default function LessonModal({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <div className="modal-container">
        <div className="modal">
          <button type="button" className="modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
          <LessonDetails lesson={lesson} />
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
