import React from 'react';
import { Button, Card, Group, Rating, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dots, Message, Share } from 'tabler-icons-react';

const PostListItem = ({ userPost }) => {
  return (
    <Card>
      <Stack
        component={Link}
        sx={{ gap: 10, textDecoration: 'none', color: '#000' }}
        to={`/${userPost.postItemType}s/${userPost.postItemUuid}/posts/${
          userPost.uuid
        }/${userPost.title
          .replace(/[^a-zA-Z' ']/g, '')
          .split(' ')
          .slice(0, 6)
          .join('_')
          .toLowerCase()}`}
      >
        <Stack
          sx={{
            gap: 10,
            overflow: 'hidden'
          }}
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
        <Group>
          <Group sx={{ gap: 5 }}>
            <Button
              color="dark"
              leftIcon={<Message />}
              size="xs"
              variant="subtle"
            >
              {userPost.commentCount}{' '}
              {userPost.commentCount === 1 ? 'Comment' : 'Comments'}
            </Button>
          </Group>
          <Group>
            <Button
              color="dark"
              leftIcon={<Share />}
              size="xs"
              variant="subtle"
            >
              Share
            </Button>
          </Group>
          <Group>
            <Button color="dark" size="xs" variant="subtle">
              <Dots />
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

PostListItem.propTypes = {
  userPost: PropTypes.object
};

export default PostListItem;
