import React, { useContext, useEffect } from 'react';
import { Group, Stack } from '@mantine/core';
import PostList from '../components/content/posts/PostList';
import { Context as ReviewsContext } from '../providers/ReviewsProvider';

const PostsView = () => {
  const { state, fetchUserPosts } = useContext(ReviewsContext);

  useEffect(() => {
    fetchUserPosts();
  }, []);

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
        <PostList userPosts={state.userPosts.value} />
      </Stack>
    </Group>
  );
};

export default PostsView;
