import React, { useContext } from 'react';
import { Stack, Title } from '@mantine/core';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const PrivacySettings = () => {
  const { fetchUserProfile } = useContext(ReviewsContext);

  return (
    <Stack sx={{ gap: 20 }}>
      <Title order={4}>Safety & Privacy</Title>
    </Stack>
  );
};

export default PrivacySettings;
