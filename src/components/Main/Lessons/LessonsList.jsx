import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonModal from './LessonModal.jsx';

export default function LessonsList() {
  const { data, error } = useSWR(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!data) return <div>loading</div>;

  const lessonsList = data.map((lesson) => (
    <tr key={lesson.id} className="hover">
      <td>{moment(lesson.lessonDate).format('MMM Do YYYY')}</td>
      <td>{lesson.studentName}</td>
      <td>Blue</td>
      <td>
        <LessonModal lesson={lesson} />
      </td>
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Comments</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {lessonsList}
        </tbody>
      </table>
    </div>
  );
}
