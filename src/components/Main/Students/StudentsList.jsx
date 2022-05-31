import React from 'react';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import StudentDetails from './StudentDetails.jsx';

export default function StudentsList() {
  const { data: students, error } = useSWR(['/api/students', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!students) return <div>loading</div>;

  const studentsList = students.map((student) => (
    <StudentDetails student={student} />

  ));

  return (
    <div className="overflow-y-auto">
      <table className="table table-fixed w-[414px] text-sm">
        <thead>
          <tr>
            <th>Parent</th>
            <th>Student</th>
          </tr>
        </thead>
        <tbody>
          {studentsList}
        </tbody>
      </table>
    </div>
  );
}
