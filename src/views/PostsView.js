import React from 'react';
import { Group, Stack } from '@mantine/core';
import PostList from '../components/content/posts/PostList';

const PostsView = () => {
  return (
    <Group
      sx={{
        gap: 20,
        placeItems: 'start',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <Stack sx={{ flex: 1, maxWidth: 900 }}>
        <PostList searchOnRender />
      </Stack>
    </Group>
  );
};

export default PostsView;
