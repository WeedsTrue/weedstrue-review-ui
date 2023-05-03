import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import PostListItem from '../posts/PostListItem';

const ProfileHiddenList = ({}) => {
  const { state, fetchUserHiddenPosts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    totalCount: 0,
    isLoading: false
  });

  useEffect(() => {
    setFilterState({
      ...filterState,
      isLoading: true
    });
    fetchUserHiddenPosts({}, totalCount =>
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
      ) : state.userHiddenPosts.value.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              No posts available
            </Text>
          </Stack>
        </Card>
      ) : (
        state.userHiddenPosts.value.map(p => (
          <PostListItem key={p.pkUserPost} userPost={p} />
        ))
      )}
      {!filterState.isLoading &&
        filterState.totalCount > state.userHiddenPosts.value.length && (
          <Button
            color="dark"
            onClick={() =>
              fetchUserHiddenPosts({
                lastUserPost:
                  state.userHiddenPosts.value[
                    state.userHiddenPosts.value.length - 1
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

ProfileHiddenList.propTypes = {
  pkUser: PropTypes.number
};

export default ProfileHiddenList;
