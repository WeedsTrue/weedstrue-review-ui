import React, { useContext, useEffect, useState } from 'react';
import { Group, Stack } from '@mantine/core';
import PostList from '../components/content/posts/PostList';
import { Context as ReviewsContext } from '../providers/ReviewsProvider';

const PostsView = () => {
  const { state, fetchUserPosts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null,
    lastUserPost: null,
    totalCount: 0,
    isLoading: false
  });

  useEffect(() => {
    setFilterState({
      ...filterState,
      isLoading: true
    });
    fetchUserPosts(filterState, totalCount =>
      setFilterState({
        ...filterState,
        totalCount,
        isLoading: false
      })
    );
  }, []);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    setFilterState(newState);
    fetchUserPosts(newState, totalCount =>
      setFilterState({
        ...newState,
        totalCount
      })
    );
  };

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
        <PostList
          filterState={filterState}
          isLoading={state.userPosts.loading}
          onFilterChange={onFilterChange}
          userPosts={state.userPosts.value}
        />
      </Stack>
    </Group>
  );
};

export default PostsView;
