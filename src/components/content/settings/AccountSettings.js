import React, { useContext } from 'react';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { Context as AuthContext } from '../../../providers/AuthProvider';

const AccountSettings = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack sx={{ gap: 40, flex: 1 }}>
      <Title order={4}>Account Settings</Title>
      <Stack sx={{ gap: 40, flex: 1, maxWidth: 768 }}>
        <Group>
          <Stack sx={{ gap: 0 }}>
            <Text weight={500}>Email Address</Text>
            <Text color="grey" size={14}>
              {state.userData.email}
            </Text>
          </Stack>
        </Group>

        <Group sx={{ justifyContent: 'space-between' }}>
          <Stack sx={{ gap: 0 }}>
            <Text weight={500}>Change password</Text>
            <Text color="grey" size={14}>
              Password must be at least 8 characters long
            </Text>
          </Stack>
          <Button radius="xl">Change</Button>
        </Group>
      </Stack>
    </Stack>
  );
};

export default AccountSettings;
