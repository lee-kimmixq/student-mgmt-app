import React, { useState } from 'react';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonCollapsible from './LessonCollapsible.jsx';

export default function LessonsList({ accountType }) {
  const [isActionMode, setIsActionMode] = useState(false);

  const { data: lessons, error: lessonsError } = useSWR(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (lessonsError) return <div>error</div>;
  if (!lessons) return <div>loading</div>;

  const lessonsList = lessons.map((lesson) => (
    <LessonCollapsible lesson={lesson} isActionMode={isActionMode} />
  ));

  return (
    <div className="overflow-y-auto">
      <table className="table table-fixed w-[414px] text-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th className="flex flex-row items-center justify-center">
              {accountType === 'teacher' ? (
                <>
                  <FontAwesomeIcon icon="fas fa-comments" />
                  <input type="checkbox" className="toggle toggle-sm" checked={isActionMode} onClick={() => { setIsActionMode(!isActionMode); }} />
                  <FontAwesomeIcon icon="fas fa-pen-to-square" />
                </>
              ) : 'Comments'}

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
