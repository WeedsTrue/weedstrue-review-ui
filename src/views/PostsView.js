import React, { useState } from 'react';
import { Group, Stack, Text } from '@mantine/core';
import PostList from '../components/content/posts/PostList';

const POST_VIEWS = [
  {
    label: 'Following',
    value: 'following'
  },
  {
    label: 'For you',
    value: 'for-you'
  }
];

const PostsView = () => {
  const [viewState, setViewState] = useState('for-you');

  return (
    <Group
      sx={{
        gap: 20,
        placeItems: 'start',
        justifyContent: 'center',
        padding: 10
      }}
    >
      <Stack sx={{ gap: 10 }}>
        <Group sx={{ justifyContent: 'center', gap: 30 }}>
          {POST_VIEWS.map(p => {
            const isSelected = p.value === viewState;
            return (
              <Text
                key={p.value}
                onClick={() => setViewState(p.value)}
                sx={{
                  cursor: 'pointer',
                  height: 25,
                  borderBottom: isSelected ? 'solid 1px black' : 'none'
                }}
                weight={isSelected ? 500 : 'normal'}
              >
                {p.label}
              </Text>
            );
          })}
        </Group>
        <Stack sx={{ flex: 1, maxWidth: 900, width: '100%' }}>
          {viewState === POST_VIEWS[0].value ? (
            <PostList hidePostSubmit key={1} searchOnRender showFollowingOnly />
          ) : (
            <PostList key={2} searchOnRender />
          )}
        </Stack>
      </Stack>
    </Group>
  );
};

export default PostsView;
