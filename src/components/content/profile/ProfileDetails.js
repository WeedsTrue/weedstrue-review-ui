import React, { useContext, useEffect } from 'react';
import { Group, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import PostList from '../posts/PostList';

const ProfileDetails = () => {
  const { username } = useParams();
  const { state: authState } = useContext(AuthContext);
  const { state, fetchUserProfile } = useContext(ReviewsContext);

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username]);

  return (
    <Stack sx={{ gap: 20, marginTop: 20 }}>
      <Group
        sx={{
          gap: 20,
          placeItems: 'start',
          justifyContent: 'center'
        }}
      >
        <Stack style={{ flex: 1, maxWidth: 768 }}>
          <PostList fkUser={state.userProfile.value?.pkUser} hidePostSubmit />
        </Stack>

        <Stack style={{ flex: 1, maxWidth: 332 }}>
          <ProfileSidebarInfo
            isCurrentUsersProfile={
              authState.userData?.pkUser === state.userProfile.value?.pkUser
            }
            user={state.userProfile.value}
          />
        </Stack>
      </Group>
    </Stack>
  );
};

export default ProfileDetails;
