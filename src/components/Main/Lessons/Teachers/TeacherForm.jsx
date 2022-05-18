import React, { useState } from 'react';
import axios from 'axios';

import getLoginTokenCookie from '../../../../../utils/getLoginTokenCookie.mjs';

export default function TeacherForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [idToAdd, setIdToAdd] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const addTeacher = async (id) => {
    try {
      const { data } = await axios.post('api/students', { teacherId: id }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (!data.success) {
        setMessage(data.reason);
        setIdToAdd();
        return;
      }
      setMessage('Sent request to teacher');
      setIdToAdd();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const addButton = (id) => <button type="button" onClick={() => { addTeacher(id); }}>Add Teacher</button>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/teacher?username=${username}`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (!data.found) {
        setMessage(`No teacher with username '${username}' found`);
        setIdToAdd();
        return;
      }
      setMessage(`Teacher Found: ${data.teacher.displayName}`);
      setIdToAdd(data.teacher.id);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form>
      <input type="text" id="content" value={username} onChange={handleUsernameChange} />
      <button type="submit" onClick={handleSubmit}>Find Teacher</button>
      <br />
      <span>
        {message}
        {' '}
        {idToAdd && addButton(idToAdd)}
      </span>
    </form>
  );
}
