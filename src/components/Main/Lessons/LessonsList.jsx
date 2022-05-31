import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonCollapsible from './LessonCollapsible.jsx';

export default function LessonsList() {
  const [isActionMode, setIsActionMode] = useState(true);

  const { data: lessons, error: lessonsError } = useSWR(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (lessonsError) return <div>error</div>;
  if (!lessons) return <div>loading</div>;

  const lessonsList = lessons.map((lesson) => (
    <LessonCollapsible lesson={lesson} isActionMode={isActionMode} />
  ));

  return (
    <div className="overflow-y-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th className="flex flex-col items-center">
              <p>Comments/Actions</p>
              <input type="checkbox" className="toggle toggle-sm" checked={isActionMode} onClick={() => { setIsActionMode(!isActionMode); }} />
            </th>
          </tr>
        </thead>
        <tbody>
          {lessonsList}
        </tbody>
      </table>
    </div>
  );
}
