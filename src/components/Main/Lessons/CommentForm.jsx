import React, { useState } from 'react';
import axios from 'axios';
import { mutate } from 'swr';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function CommentForm({ lessonId }) {
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
      const { data } = await axios.post(`/api/lesson/${lessonId}/comments`, { content }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (data.success) {
        setContent('');
        setIsVisible(false);
        mutate([`/api/lesson/${lessonId}/comments`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
        mutate([`/api/lesson/${lessonId}/comment-data`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  if (isVisible) {
    return (
      <form>
        <textarea type="text" id="content" value={content} className="input input-bordered w-full text-sm" onChange={handleContentChange} />
        <span>{contentMessage}</span>
        <br />
        <button type="submit" className="btn btn-sm btn-warning" onClick={handleSubmit}>Comment</button>
      </form>
    );
  }
  return (
    <button type="button" className="btn btn-sm btn-warning" onClick={() => setIsVisible(true)}>
      New Comment
    </button>
  );
}
