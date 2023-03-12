import React from 'react';
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

const PostList = ({ userPosts, isLoading, onFilterChange, filterState }) => {
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
      <PostListFilter
        filterState={filterState}
        isLoading={isLoading}
        onFilterChange={onFilterChange}
      />
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
        userPosts.map(p => <PostListItem key={p.pkUserPost} userPost={p} />)
      )}
      {!isLoading && filterState.totalCount > userPosts.length && (
        <Button
          color="dark"
          onClick={() =>
            onFilterChange(
              'lastUserPost',
              userPosts[userPosts.length - 1].pkUserPost
            )
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

PostList.propTypes = {
  filterState: PropTypes.object,
  isLoading: PropTypes.bool,
  userPosts: PropTypes.array,
  onFilterChange: PropTypes.func
};

export default PostList;
