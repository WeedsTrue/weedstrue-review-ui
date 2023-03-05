import React from 'react';
import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Photo, Link as LinkIcon } from 'tabler-icons-react';
import PostListItem from './PostListItem';

const PostList = ({ userPosts, isLoading }) => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ flex: 1, gap: 15 }}>
      <Card>
        <Group
          sx={{
            gap: 5
          }}
        >
          <Avatar
            size={36}
            styles={{ placeholderIcon: { height: '100%', width: '100%' } }}
          />
          <TextInput
            onClick={() => navigate('submit')}
            placeholder="Create Post"
            style={{
              flex: 1
            }}
            styles={{
              input: {
                '&:hover': {
                  borderColor: 'dodgerblue'
                }
              }
            }}
          />
          <ActionIcon component={Link} size={36} to="submit">
            <Photo />
          </ActionIcon>
          <ActionIcon component={Link} size={36} to="submit">
            <LinkIcon />
          </ActionIcon>
        </Group>
      </Card>
      {isLoading ? (
        <>
          <PostListItem />
          <PostListItem />
          <PostListItem />
          <PostListItem />
        </>
      ) : userPosts.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              No posts available
            </Text>
          </Stack>
        </Card>
      ) : (
        userPosts
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .map(p => <PostListItem key={p.pkUserPost} userPost={p} />)
      )}
    </Stack>
  );
};

PostList.propTypes = {
  isLoading: PropTypes.bool,
  userPosts: PropTypes.array
};

export default PostList;
