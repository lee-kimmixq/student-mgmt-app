import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';
import CommentForm from './CommentForm.jsx';

export default function CommentsList({ lessonId }) {
  const { data: comments, error } = useSWR([`/api/lesson/${lessonId}/comments`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (error) return <div>error</div>;
  if (!comments) return <div>loading</div>;

  const commentsList = comments.map((comment) => (
    <div key={comment.id}>
      <div className="text-sm">
        <div className="text-neutral-content">
          <b>{comment.displayName}</b>
          :
          {' '}
          {comment.content}
          {' '}
        </div>
        <span className="text-xs text-base-content">
          <em>
            (
            {moment(comment.createdAt).fromNow()}
            )
          </em>
        </span>
      </div>
    </div>
  ));

  return (
    <div className="card max-w-sm bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base">Comments</h2>
        {commentsList}
        <CommentForm lessonId={lessonId} />
      </div>
    </div>

  );
}
