import React from 'react';
import { Card, Rating, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostListItem = ({ userPost }) => {
  return (
    <Card>
      <Stack
        component={Link}
        sx={{
          gap: 10,
          overflow: 'hidden',
          textDecoration: 'none',
          color: '#000'
        }}
        to={`/${userPost.postItemType}s/${userPost.postItemUuid}/posts/${
          userPost.uuid
        }/${userPost.title
          .replace(/[^a-zA-Z' ']/g, '')
          .split(' ')
          .slice(0, 6)
          .join('_')
          .toLowerCase()}`}
      >
        <Title
          order={4}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
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
    </Card>
  );
};

PostListItem.propTypes = {
  userPost: PropTypes.object
};

export default PostListItem;
