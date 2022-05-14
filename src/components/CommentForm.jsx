import React, { useState } from 'react';
import axios from 'axios';

export default function CommentForm({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

  const [content, setContent] = useState('');
  const [contentMessage, setContentMessage] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (content === '') {
      setContentMessage('Please type something');
      return;
    }
    try {
      const { data } = await axios.post(`/lesson/${lesson.id}/comments`, { content });
      if (data.success) {
        // rerender
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  if (isVisible) {
    return (
      <form>
        <textarea type="text" id="content" value={content} onChange={handleContentChange} />
        <span>{contentMessage}</span>
        <br />
        <button type="submit" onClick={handleSubmit}>Comment</button>
      </form>
    );
  }
  return (
    <button type="button" onClick={() => setIsVisible(true)}>
      New Comment
    </button>
  );
}
