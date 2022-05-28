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
      <p>
        {comment.displayName}
        :
        {' '}
        {comment.content}
        {' '}
        (
        {moment(comment.createdAt).fromNow()}
        )
      </p>
    </div>
  ));

  return (
    <div>
      <h4>Comments</h4>
      <div>
        {commentsList}
      </div>
      <CommentForm lessonId={lessonId} />
    </div>
  );
}
