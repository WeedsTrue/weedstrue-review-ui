import React from 'react';
import { Card, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';

const CommentList = ({ userPost, comments, isLoading }) => {
  const commentsSorted =
    comments?.sort((a, b) => new Date(b.created) - new Date(a.created)) ?? [];
  const postComments = commentsSorted.filter(c => !c.fkCommentParent);
  const commentReplies = commentsSorted.filter(c => c.fkCommentParent);

  return (
    <Stack sx={{ flex: 1, gap: 15 }}>
      {isLoading ? (
        <>
          <CommentListItem />
          <CommentListItem />
          <CommentListItem />
          <CommentListItem />
        </>
      ) : comments.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              Be the first to comment!
            </Text>
          </Stack>
        </Card>
      ) : (
        postComments.map(c => (
          <CommentListItem
            comment={c}
            key={c.pkComment}
            replyComments={commentReplies}
          />
        ))
      )}
    </Stack>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  isLoading: PropTypes.bool,
  userPost: PropTypes.object
};

export default CommentList;
