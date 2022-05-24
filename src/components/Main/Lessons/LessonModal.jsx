import React, { useState } from 'react';

import LessonDetails from './LessonDetails.jsx';

export default function LessonModal({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    return (
      <div>
        <button htmlFor={`modal-${lesson.id}`} className="btn btn-sm btn-circle right-2 top-2" onClick={() => { setIsVisible(false); }}>✕</button>
        <LessonDetails lesson={lesson} />
      </div>
    );
  }
  return (
    <button type="button" className="btn btn-warning btn-sm" onClick={() => setIsVisible(true)}>View</button>
  );
}
