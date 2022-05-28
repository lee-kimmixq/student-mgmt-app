import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonModal from './LessonModal.jsx';

export default function LessonsList() {
  const { data: lessons, error: lessonsError } = useSWR(['/api/lessons', { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (lessonsError) return <div>error</div>;
  if (!lessons) return <div>loading</div>;

  const lessonsList = lessons.map((lesson) => (
    <tr key={lesson.id} className="hover">
      <td>{moment(lesson.lessonDate).format('MMM Do YYYY')}</td>
      <td>{lesson.studentName}</td>
      <td>
        <FontAwesomeIcon icon="far fa-message" />
        {' '}
        {lesson.commentCount}
        {' '}
        {lesson.recentCommentDate
      && `(${moment(lesson.recentCommentDate.createdAt).fromNow()})` }
      </td>
      <td>
        <LessonModal lessonId={lesson.id} />
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
