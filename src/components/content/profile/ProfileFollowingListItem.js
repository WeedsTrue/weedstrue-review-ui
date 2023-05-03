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

const ProfileFollowingListItem = ({ following, canEdit }) => {
  const { followUser, unfollowUser } = useContext(ReviewsContext);
  const [followingState, setFollowingState] = useState({
    isFollowing: true,
    loading: false
  });

  return following ? (
    <Card
      component={Link}
      style={{ padding: 10 }}
      to={`/profile/${following.username}`}
    >
      <Group>
        <Avatar height={50} radius="xl" src={following.avatar} width={50} />
        <Stack sx={{ flex: 1, gap: 5 }}>
          <Text sx={{ lineHeight: '18px' }} weight={500}>
            {following.username}
          </Text>
          {canEdit && (
            <>
              {followingState.isFollowing ? (
                <Button
                  compact
                  loading={followingState.loading}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setFollowingState({
                      ...followingState,
                      loading: true
                    });
                    unfollowUser(
                      following.pkUser,
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
                  Unfollow
                </Button>
              ) : (
                <Button
                  compact
                  loading={followingState.loading}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    setFollowingState({
                      ...followingState,
                      loading: true
                    });
                    followUser(
                      following.pkUser,
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
                  Follow
                </Button>
              )}
            </>
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

ProfileFollowingListItem.propTypes = {
  canEdit: PropTypes.bool,
  following: PropTypes.object
};

export default ProfileFollowingListItem;
