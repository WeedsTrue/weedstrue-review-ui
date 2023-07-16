import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import PostListItem from '../posts/PostListItem';

const ProfileDownvoteList = ({}) => {
  const { state, fetchUserPostReactionPosts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    totalCount: 0,
    isLoading: false
  });

  useEffect(() => {
    setFilterState({
      ...filterState,
      isLoading: true
    });
    fetchUserPostReactionPosts({ isPositive: false }, totalCount =>
      setFilterState({
        ...filterState,
        totalCount,
        isLoading: false
      })
    );
  }, []);

  return (
    <Stack sx={{ flex: 1, gap: 15 }}>
      {filterState.isLoading ? (
        <>
          <PostListItem />
          <PostListItem />
          <PostListItem />
          <PostListItem />
        </>
      ) : state.userNegativeReactionPosts.value.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              No posts available
            </Text>
          </Stack>
        </Card>
      ) : (
        <>
          {state.userNegativeReactionPosts.value.map(p => (
            <PostListItem key={p.pkUserPost} userPost={p} />
          ))}
          {filterState.totalCount >
            state.userNegativeReactionPosts.value.length && (
            <Button
              color="dark"
              onClick={() =>
                fetchUserPostReactionPosts({
                  isPositive: false,
                  skip: state.userNegativeReactionPosts.value[
                    state.userNegativeReactionPosts.value.length - 1
                  ]
                })
              }
              sx={{ margin: 'auto', marginTop: 10 }}
              variant="outline"
            >
              Show More
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};

ProfileDownvoteList.propTypes = {
  pkUser: PropTypes.number
};

export default ProfileDownvoteList;
