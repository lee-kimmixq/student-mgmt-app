import React from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function TeachersList() {
  const { data, error } = useSWR(['/api/teachers', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  const teachersList = data.map((teacher) => (
    <li key={teacher.id}>
      {teacher.teacherName}
    </li>
  ));

  return (
    <div>
      <ul>
        {teachersList}
      </ul>
    </div>
  );
}
