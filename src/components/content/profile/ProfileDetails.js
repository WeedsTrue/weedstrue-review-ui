import React, { useContext, useEffect } from 'react';
import { Group, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import PostList from '../posts/PostList';

const ProfileDetails = () => {
  const { username } = useParams();
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
          <ProfileSidebarInfo user={state.userProfile.value} />
        </Stack>
      </Group>
    </Stack>
  );
};

export default ProfileDetails;
