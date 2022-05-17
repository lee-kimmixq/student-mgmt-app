import React from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import fetcher from '../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../utils/getLoginTokenCookie.mjs';

export default function StudentsList() {
  const { data, error } = useSWR(['/api/students', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  const changeStudentStatus = async (contractId, newStatus) => {
    try {
      const response = await axios.post(`/api/student/${contractId}`, { status: newStatus }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (response.data.success) {
        mutate(['/api/students', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const acceptButton = (contractId) => <button type="button" onClick={() => { changeStudentStatus(contractId, 'accepted'); }}>✔️</button>;

  const rejectButton = (contractId) => <button type="button" onClick={() => { changeStudentStatus(contractId, 'rejected'); }}>❌</button>;

  const inactiveButton = (contractId) => <button type="button" onClick={() => { changeStudentStatus(contractId, 'inactive'); }}>🚫</button>;

  const requestButton = (contractId) => <button type="button" onClick={() => { changeStudentStatus(contractId, 'requested'); }}>↩️</button>;

  const studentsList = data.map((student) => (
    <li key={student.id}>
      {student.parentName}
      (
      {student.studentName}
      )
      {' '}
      | $
      {student.lessonRate}
      {' '}
      |
      {' '}
      {student.status}
      {' '}
      {(student.status === 'requested' || student.status === 'inactive') && acceptButton(student.id)}
      {student.status === 'requested' && rejectButton(student.id)}
      {student.status === 'accepted' && inactiveButton(student.id)}
      {student.status === 'rejected' && requestButton(student.id)}
    </li>
  ));

  return (
    <div>
      <ul>
        {studentsList}
      </ul>
    </div>
  );
}
