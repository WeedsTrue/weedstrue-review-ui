import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Photo, Link as LinkIcon } from 'tabler-icons-react';
import PostListFilter from './PostListFilter';
import PostListItem from './PostListItem';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const PostList = ({
  isLoading,
  fkUser,
  fkBrand,
  fkProduct,
  showFollowingOnly,
  hidePostSubmit,
  searchOnRender,
  noPostsAvailableTextOverride
}) => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const { state: authState } = useContext(AuthContext);
  const { state, fetchUserPosts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null,
    skip: null,
    totalCount: 0,
    isLoading: false
  });

  useEffect(() => {
    if (searchOnRender && authState.tokenAttempted && !authState.loading) {
      setFilterState({
        ...filterState,
        isLoading: true
      });
      fetchUserPosts(
        { ...filterState, fkUser, fkBrand, fkProduct, showFollowingOnly },
        totalCount =>
          setFilterState({
            ...filterState,
            totalCount,
            isLoading: false,
            skip: null,
            showMoreLoading: false
          })
      );
      hasFetched.current = true;
    }
  }, [searchOnRender, authState.tokenAttempted, authState.loading]);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    newState.showMoreLoading = !!newState.skip;
    setFilterState(newState);
    fetchUserPosts(
      { ...newState, fkUser, fkBrand, fkProduct, showFollowingOnly },
      totalCount =>
        setFilterState({
          ...newState,
          totalCount,
          isLoading: false,
          skip: null,
          showMoreLoading: false
        })
    );
  };

  return (
    <Stack sx={mq({ flex: 1, gap: [5, 10, 15] })}>
      {!hidePostSubmit && (
        <Card
          sx={mq({
            padding: ['10px !important', '15px !important', '20px !important']
          })}
        >
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
      )}

      <PostListFilter
        filterState={filterState}
        isLoading={isLoading}
        onFilterChange={onFilterChange}
      />
      {(searchOnRender && !hasFetched.current) ||
      isLoading ||
      state.userPosts.loading ? (
        <>
          <PostListItem />
          <PostListItem />
          <PostListItem />
          <PostListItem />
        </>
      ) : state.userPosts.value.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              {!noPostsAvailableTextOverride
                ? 'Be the first to post!'
                : noPostsAvailableTextOverride}
            </Text>
          </Stack>
        </Card>
      ) : (
        <>
          {state.userPosts.value.map(p => (
            <PostListItem key={p.pkUserPost} userPost={p} />
          ))}
          {filterState.totalCount > state.userPosts.value.length && (
            <Button
              color="blue"
              loading={filterState.showMoreLoading}
              onClick={() =>
                onFilterChange('skip', state.userPosts.value.length)
              }
              sx={{ margin: '10px auto' }}
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

PostList.propTypes = {
  fkBrand: PropTypes.number,
  fkProduct: PropTypes.number,
  fkUser: PropTypes.number,
  hidePostSubmit: PropTypes.bool,
  isLoading: PropTypes.bool,
  noPostsAvailableTextOverride: PropTypes.string,
  searchOnRender: PropTypes.bool,
  showFollowingOnly: PropTypes.bool
};

export default PostList;
