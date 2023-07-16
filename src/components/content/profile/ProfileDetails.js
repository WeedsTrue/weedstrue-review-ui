import React, { useContext, useEffect, useRef } from 'react';
import { Button, Card, Group, Menu, Stack } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { Dots } from 'tabler-icons-react';
import ProfileCommentsList from './ProfileCommentsList';
import ProfileDownvoteList from './ProfileDownvoteList';
import ProfileFollowersList from './ProfileFollowersList';
import ProfileFollowingList from './ProfileFollowingList';
import ProfileHiddenList from './ProfileHiddenList';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import ProfileUpvoteList from './ProfileUpvoteList';
import { mq } from '../../../config/theme';
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
  const hasFetched = useRef(false);
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
      hasFetched.current = true;
    }
  }, [username]);

  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={mq({ flex: 1, display: ['none', 'none', 'flex'] })}>
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
      </Stack>
      <Stack sx={{ gap: 20 }}>
        <Group
          noWrap
          sx={mq({
            gap: [5, 10, 20],
            placeItems: 'start',
            flexDirection: ['column', 'column', 'row-reverse'],
            justifyContent: 'center'
          })}
        >
          <Stack
            sx={mq({
              gap: 0,
              flex: 1,
              maxWidth: ['unset', 'unset', 332],
              alignSelf: 'stretch'
            })}
          >
            <Stack
              sx={mq({
                flex: 1,
                maxWidth: ['unset', 'unset', 332],
                gap: [0, 0, 20]
              })}
            >
              <ProfileSidebarInfo
                isCurrentUsersProfile={isCurrentUsersProfile}
                user={state.userProfile.value}
              />
            </Stack>
          </Stack>

          <Group
            sx={mq({
              flex: 1,
              alignSelf: 'stretch',
              display: ['flex', 'flex', 'none']
            })}
          >
            <Card
              sx={mq({
                flex: 1,
                overflow: 'visible',
                padding: [
                  '10px !important',
                  '15px !important',
                  '20px !important'
                ]
              })}
            >
              <Stack sx={mq({ gap: 10 })}>
                <Group noWrap sx={{ justifyContent: 'space-between', gap: 5 }}>
                  <Group
                    noWrap
                    sx={mq({
                      gap: [0, 10],
                      flex: 1
                    })}
                  >
                    {[PROFILE_TABS[0]].map(t => {
                      const isSelected = t.value === view;
                      return (
                        <Button
                          color={isSelected ? 'blue' : 'gray'}
                          key={t.value}
                          leftIcon={t.icon}
                          onClick={() =>
                            navigate(`/profile/${username}/${t.value}`)
                          }
                          radius="xl"
                          styles={{ leftIcon: { marginRight: 10 } }}
                          variant={isSelected ? 'light' : 'subtle'}
                        >
                          {t.label}
                        </Button>
                      );
                    })}
                    {view === 'posts' || view === 'comments' ? (
                      <Button
                        color={view === 'comments'}
                        key={'comments'}
                        onClick={() =>
                          navigate(`/profile/${username}/comments`)
                        }
                        radius="xl"
                        styles={{ leftIcon: { marginRight: 10 } }}
                        variant={view === 'comments' ? 'light' : 'subtle'}
                      >
                        COMMENTS
                      </Button>
                    ) : (
                      <Button
                        color="blue"
                        onClick={() => navigate(`/profile/${username}/${view}`)}
                        radius="xl"
                        styles={{ leftIcon: { marginRight: 10 } }}
                        variant={'light'}
                      >
                        {view === 'followers'
                          ? `FOLLOWERS (${state.userProfile.value?.userFollowersCount})`
                          : view === 'following'
                          ? `FOLLOWING (${state.userProfile.value?.userFollowingCount})`
                          : view.toUpperCase()}
                      </Button>
                    )}
                  </Group>
                  <Group>
                    <Menu shadow="md" width={200} withArrow>
                      <Menu.Target>
                        <Button
                          color="dark"
                          onClick={e => e.preventDefault()}
                          size="xs"
                          sx={{ padding: 3 }}
                          variant="subtle"
                        >
                          <Dots />
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={e => {
                            e.preventDefault();
                            navigate(`/profile/${username}/comments`);
                          }}
                        >
                          COMMENTS
                        </Menu.Item>

                        {AUTH_TABS.map(t => (
                          <Menu.Item
                            key={t.value}
                            onClick={e => {
                              e.preventDefault();
                              navigate(`/profile/${username}/${t.value}`);
                            }}
                          >
                            {t.label}
                          </Menu.Item>
                        ))}
                        {state.userProfile.value &&
                          (!state.userProfile.value.followersDisabled ||
                            authState.userData?.pkUser ===
                              state.userProfile.value?.pkUser) && (
                            <>
                              <Menu.Item
                                onClick={e => {
                                  e.preventDefault();
                                  navigate(`/profile/${username}/followers`);
                                }}
                              >
                                FOLLOWERS (
                                {state.userProfile.value.userFollowersCount})
                              </Menu.Item>
                              <Menu.Item
                                onClick={e => {
                                  e.preventDefault();
                                  navigate(`/profile/${username}/following`);
                                }}
                              >
                                FOLLOWING (
                                {state.userProfile.value.userFollowingCount})
                              </Menu.Item>
                            </>
                          )}
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Group>
              </Stack>
            </Card>
          </Group>

          <Stack
            sx={mq({
              flex: 1,
              maxWidth: ['unset', 'unset', 768],
              alignSelf: 'stretch'
            })}
          >
            {view === 'posts' ? (
              <PostList
                fkUser={state.userProfile.value?.pkUser}
                hidePostSubmit
                isLoading={!hasFetched.current || state.userProfile.loading}
                noPostsAvailableTextOverride="No Posts Available"
                searchOnRender
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
        </Group>
      </Stack>
    </Stack>
  );
};

export default ProfileDetails;
