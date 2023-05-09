import React, { useContext, useState } from 'react';
import { Group, Stack, Text } from '@mantine/core';
import PostList from '../components/content/posts/PostList';
import { mq } from '../config/theme';
import { Context as AuthContext } from '../providers/AuthProvider';

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
  const { state } = useContext(AuthContext);
  const [viewState, setViewState] = useState('for-you');

  return (
    <Group
      sx={mq({
        gap: 20,
        placeItems: 'start',
        justifyContent: 'center',
        padding: [0, 0, 10]
      })}
    >
      <Stack sx={mq({ gap: [5, 10], flex: 1, alignItems: 'center' })}>
        {state.isAuthenticated && (
          <Group
            sx={mq({
              justifyContent: 'center',
              gap: 30,
              paddingTop: [5, 10, 0]
            })}
          >
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
        )}

        <Stack sx={{ flex: 1, maxWidth: 900, width: '100%' }}>
          {viewState === POST_VIEWS[0].value ? (
            <PostList hidePostSubmit key={1} searchOnRender showFollowingOnly />
          ) : (
            <PostList
              hidePostSubmit={!state.isAuthenticated}
              key={2}
              searchOnRender
            />
          )}
        </Stack>
      </Stack>
    </Group>
  );
};

export default PostsView;
