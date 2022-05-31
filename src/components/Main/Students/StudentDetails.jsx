import React, { useState } from 'react';
import { mutate } from 'swr';
import axios from 'axios';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function StudentDetails({ student }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [studentName, setStudentName] = useState(student.studentName);
  const [studentNameMessage, setStudentNameMessage] = useState('');

  const changeStudentStatus = async (contractId, newStatus) => {
    try {
      const response = await axios.put(`/api/student/${contractId}`, { status: newStatus }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (response.data.success) {
        mutate(['/api/students', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleEdit = async (contractId) => {
    if (!studentName) {
      setStudentNameMessage('Please input student name!');
    }
    try {
      const response = await axios.put(`/api/student/${contractId}`, { studentName }, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } });
      if (response.data.success) {
        mutate(['/api/students', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const acceptButton = (contractId) => <button type="button" className="btn btn-accent btn-xs" onClick={() => { changeStudentStatus(contractId, 'accepted'); }}>Accept</button>;

  const rejectButton = (contractId) => <button type="button" className="btn btn-secondary btn-xs" onClick={() => { changeStudentStatus(contractId, 'rejected'); }}>Reject</button>;

  const inactiveButton = (contractId) => <button type="button" className="btn btn-primary btn-xs" onClick={() => { changeStudentStatus(contractId, 'inactive'); }}>Inactive</button>;

  const requestButton = (contractId) => <button type="button" className="btn btn-xs" onClick={() => { changeStudentStatus(contractId, 'requested'); }}>Reset</button>;

  const editButton = () => <button type="button" className="btn btn-warning btn-xs" onClick={() => { setIsEditMode(true); }}>Edit</button>;

  const studentRow = (
    <tr key={student.id} className="hover" onClick={() => setIsExpanded(!isExpanded)}>
      <td>{student.parentName}</td>
      <td>
        {student.studentName}
        {' '}
        <span className="badge badge-xs badge-ghost"><em>{student.status}</em></span>
      </td>
    </tr>
  );

  if (isExpanded) {
    return (
      <>
        {studentRow}
        {isEditMode && (
        <tr>
          <div className="flex items-center mx-2">
            <input type="text" id="name" className="input input-bordered" value={studentName} onChange={handleStudentNameChange} />
            <button type="submit" className="btn btn-sm btn-warning" onClick={() => handleEdit(student.id)}>Edit Student Name</button>
          </div>
          <p className="text-xs italic text-rose-600 leading-6 indent-2 mx-3">{studentNameMessage}</p>
        </tr>
        )}
        <tr>
          <td>
            {editButton(student.id)}
            {(student.status === 'requested' || student.status === 'inactive') && acceptButton(student.id)}
            {student.status === 'requested' && rejectButton(student.id)}
            {student.status === 'accepted' && inactiveButton(student.id)}
            {student.status === 'rejected' && requestButton(student.id)}
          </td>
        </tr>
      </>
    );
  }

  return studentRow;
}
