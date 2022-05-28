import React, { useState } from 'react';

import LessonDetails from './LessonDetails.jsx';

export default function LessonModal({ lessonId }) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <div>
        <button htmlFor={`modal-${lessonId}`} className="btn btn-sm btn-circle right-2 top-2" onClick={() => { setIsVisible(false); }}>✕</button>
        <LessonDetails lessonId={lessonId} />
      </div>
    );
  }
  return (
    <button type="button" className="btn btn-warning btn-sm" onClick={() => setIsVisible(true)}>View</button>
  );
}
