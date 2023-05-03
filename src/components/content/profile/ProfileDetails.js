import React, { useContext, useEffect } from 'react';
import { Card, Group, Stack } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileCommentsList from './ProfileCommentsList';
import ProfileDownvoteList from './ProfileDownvoteList';
import ProfileFollowersList from './ProfileFollowersList';
import ProfileFollowingList from './ProfileFollowingList';
import ProfileHiddenList from './ProfileHiddenList';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import ProfileUpvoteList from './ProfileUpvoteList';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CustomTab from '../../common/CustomTab';
import PostList from '../posts/PostList';

const PROFILE_TABS = [
  {
    value: 'posts',
    label: 'POSTS'
  },
  {
    value: 'comments',
    label: 'COMMENTS'
  }
];

const AUTH_TABS = [
  {
    value: 'hidden',
    label: 'HIDDEN'
  },
  {
    value: 'upvoted',
    label: 'UPVOTED'
  },
  {
    value: 'downvoted',
    label: 'DOWNVOTED'
  }
];

const ProfileDetails = () => {
  const navigate = useNavigate();
  const { username, view } = useParams();
  const { state: authState } = useContext(AuthContext);
  const { state, fetchUserProfile } = useContext(ReviewsContext);
  const isCurrentUsersProfile =
    state.userProfile.value &&
    authState.userData?.pkUser === state.userProfile.value?.pkUser;

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username]);

  return (
    <Stack sx={{ gap: 20 }}>
      <Card height={150} style={{ padding: 0 }}>
        <Group
          sx={{
            gap: 20,
            placeItems: 'start',
            justifyContent: 'center'
          }}
        >
          <Group style={{ flex: 1, maxWidth: 1110 }}>
            <Group sx={{ gap: 10 }}>
              {PROFILE_TABS.map(t => (
                <CustomTab
                  isSelected={t.value === view}
                  key={t.value}
                  label={t.label}
                  onTabChange={() =>
                    navigate(`/profile/${username}/${t.value}`)
                  }
                  value={t.value}
                />
              ))}
              {isCurrentUsersProfile &&
                AUTH_TABS.map(t => (
                  <CustomTab
                    isSelected={t.value === view}
                    key={t.value}
                    label={t.label}
                    onTabChange={() =>
                      navigate(`/profile/${username}/${t.value}`)
                    }
                    value={t.value}
                  />
                ))}

              {state.userProfile.value &&
                (!state.userProfile.value.followersDisabled ||
                  authState.userData?.pkUser ===
                    state.userProfile.value?.pkUser) && (
                  <>
                    <CustomTab
                      isSelected={view === 'followers'}
                      label={`FOLLOWERS (${state.userProfile.value.userFollowersCount})`}
                      onTabChange={() =>
                        navigate(`/profile/${username}/followers`)
                      }
                      value={'followers'}
                    />
                    <CustomTab
                      isSelected={view === 'following'}
                      label={`FOLLOWING (${state.userProfile.value.userFollowingCount})`}
                      onTabChange={() =>
                        navigate(`/profile/${username}/following`)
                      }
                      value={'following'}
                    />
                  </>
                )}
            </Group>
          </Group>
        </Group>
      </Card>
      <Stack sx={{ gap: 20 }}>
        <Group
          sx={{
            gap: 20,
            placeItems: 'start',
            justifyContent: 'center'
          }}
        >
          <Stack style={{ flex: 1, maxWidth: 768 }}>
            {view === 'posts' ? (
              <PostList
                fkUser={state.userProfile.value?.pkUser}
                hidePostSubmit
                noPostsAvailableTextOverride="No Posts Available"
              />
            ) : view === 'comments' ? (
              <ProfileCommentsList pkUser={state.userProfile.value?.pkUser} />
            ) : view === 'hidden' ? (
              <ProfileHiddenList />
            ) : view === 'upvoted' ? (
              <ProfileUpvoteList pkUser={state.userProfile.value?.pkUser} />
            ) : view === 'downvoted' ? (
              <ProfileDownvoteList pkUser={state.userProfile.value?.pkUser} />
            ) : view === 'followers' ? (
              <ProfileFollowersList
                isCurrentUsersProfile={isCurrentUsersProfile}
                pkUser={state.userProfile.value?.pkUser}
              />
            ) : view === 'following' ? (
              <ProfileFollowingList
                isCurrentUsersProfile={isCurrentUsersProfile}
                pkUser={state.userProfile.value?.pkUser}
              />
            ) : (
              <></>
            )}
          </Stack>

          <Stack style={{ flex: 1, maxWidth: 332 }}>
            <ProfileSidebarInfo
              isCurrentUsersProfile={isCurrentUsersProfile}
              user={state.userProfile.value}
            />
          </Stack>
        </Group>
      </Stack>
    </Stack>
  );
};

export default ProfileDetails;
