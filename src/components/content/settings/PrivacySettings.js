import React, { useContext, useEffect, useState } from 'react';
import { Button, Group, Stack, Switch, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as AuthContext } from '../../../providers/AuthProvider';

const PrivacySettings = () => {
  const { state, updateUserPrivacy } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    followersDisabled: state.userData?.followersDisabled ?? false,
    hasChanges: false,
    isLoading: false
  });

  useEffect(() => {
    setFormState({
      followersDisabled: state.userData?.followersDisabled ?? false,
      hasChanges: false,
      isLoading: false
    });
  }, []);

  const onSaveChanges = () => {
    setFormState({
      ...formState,
      isLoading: true
    });
    updateUserPrivacy(
      formState,
      () => {
        setFormState({
          ...formState,
          isLoading: false,
          hasChanges: false
        });
        triggerNotification('Profile Updated!', 'Success', 'green');
      },
      message => {
        setFormState({
          ...formState,
          isLoading: false
        });
        triggerNotification(message);
      }
    );
  };

  const onCancel = () => {
    setFormState({
      followersDisabled: false,
      hasChanges: false,
      isLoading: false
    });
  };

  return (
    <Stack sx={{ gap: 20, flex: 1 }}>
      <Stack sx={{ gap: 20, flex: 1, maxWidth: 768 }}>
        <Group sx={{ justifyContent: 'space-between' }}>
          <Title order={4}>Safety & Privacy</Title>

          {formState.hasChanges && (
            <Group sx={mq({ display: ['none', 'flex'] })}>
              <Button
                color="dark"
                disabled={formState.isLoading}
                onClick={onCancel}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                loading={formState.isLoading}
                onClick={onSaveChanges}
                sx={{ flex: 1 }}
              >
                Save Changes
              </Button>
            </Group>
          )}
        </Group>
        <Group>
          <Group
            noWrap
            sx={{ gap: 20, flex: 1, justifyContent: 'space-between' }}
          >
            <Stack sx={{ gap: 0, maxWidth: 500 }}>
              <Text weight={500}>Allow people to follow you</Text>
              <Text color="grey" size={14} sx={{}}>
                Allow people from the comunity to follow your profile and have
                your content show up on their feed
              </Text>
            </Stack>
            <Switch
              checked={!formState.followersDisabled}
              onChange={e =>
                setFormState({
                  ...formState,
                  followersDisabled: !e.currentTarget.checked,
                  hasChanges: true
                })
              }
              size="md"
            />
          </Group>
        </Group>

        {formState.hasChanges && (
          <Group sx={mq({ display: ['flex', 'none'], flex: 1 })}>
            <Button
              color="dark"
              disabled={formState.isLoading}
              onClick={onCancel}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              loading={formState.isLoading}
              onClick={onSaveChanges}
              style={{ flex: 1 }}
            >
              Save Changes
            </Button>
          </Group>
        )}
      </Stack>
    </Stack>
  );
};

export default PrivacySettings;
