import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProfileSidebarInfoProfileActionButton = ({
  isCurrentUsersProfile,
  user,
  followState,
  setFollowState
}) => {
  const navigate = useNavigate();
  const { followUser, unfollowUser } = useContext(ReviewsContext);

  return (
    <>
      {isCurrentUsersProfile ? (
        <Button
          onClick={() => navigate('/settings')}
          radius="xl"
          sx={{ width: '100%', maxWidth: 250 }}
        >
          Settings
        </Button>
      ) : (user.userFollower && !followState.hasChanged) ||
        followState.isFollowing ? (
        <Button
          disabled={followState.isLoading}
          onClick={() => {
            setFollowState({
              ...followState,
              isLoading: true
            });
            unfollowUser(
              user.pkUser,
              () =>
                setFollowState({
                  isLoading: false,
                  isFollowing: false,
                  hasChanged: true
                }),
              () =>
                setFollowState({
                  ...followState,
                  isLoading: false
                })
            );
          }}
          radius="xl"
          sx={{ width: '100%', maxWidth: 250 }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          disabled={followState.isLoading}
          onClick={() => {
            setFollowState({
              ...followState,
              isLoading: true
            });
            followUser(
              user.pkUser,
              () =>
                setFollowState({
                  isLoading: false,
                  isFollowing: true,
                  hasChanged: true
                }),
              () =>
                setFollowState({
                  ...followState,
                  isLoading: false
                })
            );
          }}
          radius="xl"
          sx={{ width: '100%', maxWidth: 250 }}
          variant="outline"
        >
          Follow
        </Button>
      )}
    </>
  );
};

ProfileSidebarInfoProfileActionButton.propTypes = {
  followState: PropTypes.object,
  isCurrentUsersProfile: PropTypes.bool,
  isLoading: PropTypes.bool,
  setFollowState: PropTypes.func,
  user: PropTypes.object
};

export default ProfileSidebarInfoProfileActionButton;
