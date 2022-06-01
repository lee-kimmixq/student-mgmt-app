import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import LessonEditForm from './LessonEditForm.jsx';
import CommentsList from './CommentsList.jsx';

export default function LessonDetails({ lessonId, isEditMode, setIsEditMode }) {
  const { data: lesson, error } = useSWR([`/api/lesson/${lessonId}`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!lesson) return <div>loading</div>;

  if (isEditMode) {
    return (
      <LessonEditForm lesson={lesson} setIsEditMode={setIsEditMode} />
    );
  }
  return (
    <div className="card w-[380px] bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base">
          Lesson Notes
          {' '}
          {/* {moment(lesson.lessonDate).format('HH:mm')} */}
        </h2>
        <p className="whitespace-pre-line">
          {lesson.details}
        </p>

        <CommentsList lessonId={lessonId} />
        <div className="whitespace-pre-line">
          <em>
            created
            {' '}
            {moment(lesson.createdAt).fromNow()}
            , last edited
            {' '}
            {moment(lesson.updatedAt).fromNow()}
          </em>
        </div>
      </div>
    </div>

  );
}
