import React from 'react';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonCollapsible from './LessonCollapsible.jsx';

export default function LessonsList() {
  const { data: lessons, error: lessonsError } = useSWR(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (lessonsError) return <div>error</div>;
  if (!lessons) return <div>loading</div>;

  const lessonsList = lessons.map((lesson) => (
    <LessonCollapsible lesson={lesson} />
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {lessonsList}
        </tbody>
      </table>
    </div>
  );
}
