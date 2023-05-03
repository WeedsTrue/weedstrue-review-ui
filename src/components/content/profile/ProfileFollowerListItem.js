import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Group,
  Skeleton,
  Stack,
  Text
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProfileFollowerListItem = ({ follower }) => {
  const { deleteFollower } = useContext(ReviewsContext);
  const [followingState, setFollowingState] = useState({
    isFollowing: true,
    loading: false
  });

  return follower ? (
    <Card
      component={Link}
      style={{ padding: 10 }}
      to={`/profile/${follower.username}`}
    >
      <Group>
        <Avatar height={50} radius="xl" src={follower.avatar} width={50} />
        <Stack sx={{ flex: 1, gap: 5 }}>
          <Text sx={{ lineHeight: '18px' }} weight={500}>
            {follower.username}
          </Text>
          {followingState.isFollowing ? (
            <Button
              compact
              loading={followingState.loading}
              onClick={e => {
                e.preventDefault();
                setFollowingState({
                  ...followingState,
                  loading: true
                });
                deleteFollower(
                  follower.pkUser,
                  { undo: false },
                  () =>
                    setFollowingState({
                      loading: false,
                      isFollowing: false
                    }),
                  () =>
                    setFollowingState({
                      loading: false,
                      isFollowing: true
                    })
                );
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              compact
              loading={followingState.loading}
              onClick={e => {
                e.preventDefault();
                setFollowingState({
                  ...followingState,
                  loading: true
                });
                deleteFollower(
                  follower.pkUser,
                  { undo: true },
                  () =>
                    setFollowingState({
                      loading: false,
                      isFollowing: true
                    }),
                  () =>
                    setFollowingState({
                      ...followingState,
                      loading: false
                    })
                );
              }}
              variant="outline"
            >
              Undo
            </Button>
          )}
        </Stack>
      </Group>
    </Card>
  ) : (
    <Card style={{ padding: 10 }}>
      <Group>
        <Skeleton height={30} radius="xl" width={30} />
        <Stack sx={{ flex: 1, gap: 5 }}>
          <Text weight={500}>
            <Skeleton height={14} width="75%" />
          </Text>
          <Skeleton height={24} width="100%" />
        </Stack>
      </Group>
    </Card>
  );
};

ProfileFollowerListItem.propTypes = {
  follower: PropTypes.object
};

export default ProfileFollowerListItem;
