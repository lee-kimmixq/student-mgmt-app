import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LessonDetails from './LessonDetails.jsx';

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
          <LessonDetails lesson={lesson} />
          <button type="button" onClick={handleDelete}>Delete</button>
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
