import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import PostListItem from '../posts/PostListItem';

const ProfileUpvoteList = ({}) => {
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
    fetchUserPostReactionPosts({ isPositive: true }, totalCount =>
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
      ) : state.userPositiveReactionPosts.value.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              No posts available
            </Text>
          </Stack>
        </Card>
      ) : (
        state.userPositiveReactionPosts.value.map(p => (
          <PostListItem key={p.pkUserPost} userPost={p} />
        ))
      )}
      {!filterState.isLoading &&
        filterState.totalCount >
          state.userPositiveReactionPosts.value.length && (
          <Button
            color="dark"
            onClick={() =>
              fetchUserPostReactionPosts({
                isPositive: true,
                lastUserPost:
                  state.userPositiveReactionPosts.value[
                    state.userPositiveReactionPosts.value.length - 1
                  ]
              })
            }
            sx={{ margin: 'auto', marginTop: 10 }}
            variant="outline"
          >
            Show More
          </Button>
        )}
    </Stack>
  );
};

ProfileUpvoteList.propTypes = {
  pkUser: PropTypes.number
};

export default ProfileUpvoteList;
