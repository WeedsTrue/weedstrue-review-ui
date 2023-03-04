import React from 'react';
import { Rating, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';

const PostListItem = ({ userPost }) => {
  return (
    <Stack
      sx={{
        border: 'solid 1px lightgrey',
        padding: 10,
        gap: 10,
        overflow: 'hidden'
      }}
    >
      <Title
        order={4}
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'pre' }}
      >
        {userPost.title}
      </Title>
      <Rating readOnly value={4} />
      <Text
        sx={{
          fontSize: 14,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box',
          whiteSpace: 'pre-wrap'
        }}
      >
        {userPost.content}
      </Text>
    </Stack>
  );
};

PostListItem.propTypes = {
  userPost: PropTypes.object
};

export default PostListItem;
