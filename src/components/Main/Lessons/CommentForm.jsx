import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function CommentForm({ lesson }) {
  const [isVisible, setIsVisible] = useState(false);

  const [content, setContent] = useState('');
  const [contentMessage, setContentMessage] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content === '') {
      setContentMessage('Please type something');
      return;
    }
    try {
      const { data } = await axios.post(`/api/lesson/${lesson.id}/comments`, { content }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (data.success) {
        setContent('');
        setIsVisible(false);
        mutate([`/api/lesson/${lesson.id}/comments`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
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
