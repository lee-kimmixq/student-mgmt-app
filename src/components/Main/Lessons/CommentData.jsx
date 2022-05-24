import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetcher from '../../../../utils/fetcher.mjs';
import getLoginTokenCookie from '../../../../utils/getLoginTokenCookie.mjs';

export default function CommentData({ lessonId }) {
  const { data: comments, error: commentsError } = useSWR([`/api/lesson/${lessonId}/comment-data`, { headers: { Authorization: `Bearer ${getLoginTokenCookie(document.cookie)}` } }], fetcher);

  if (commentsError) return <div>error</div>;
  if (!comments) return <div>loading</div>;

  return (
    <td>
      <FontAwesomeIcon icon="far fa-message" />
      {' '}
      {comments.commentCount}
      {' '}
      {comments.recentCommentDate
      && `(${moment(comments.recentCommentDate).fromNow()})` }
    </td>
  );
}
