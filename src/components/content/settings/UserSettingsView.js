import React from 'react';
import { Card, Divider, Group, Stack, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import ProfileSettings from './ProfileSettings';
import { mq } from '../../../config/theme';
import CustomTab from '../../common/CustomTab';

const SETTINGS_TABS = [
  {
    value: 'account',
    label: 'Account'
  },
  {
    value: 'profile',
    label: 'Profile'
  },
  {
    value: 'privacy',
    label: 'Safety & Privacy'
  }
];

const UserSettingsView = () => {
  const navigate = useNavigate();
  const { view } = useParams();

  return (
    <Card style={{ flex: 1 }}>
      <Stack sx={{ gap: 20 }}>
        <Group
          sx={{
            gap: 20,
            placeItems: 'start',
            justifyContent: 'center'
          }}
        >
          <Stack style={{ flex: 1, maxWidth: 1100 }}>
            <Stack sx={mq({ gap: 20 })}>
              <Stack sx={mq({ gap: [10, 10, 20] })}>
                <Title order={4}>User settings</Title>
                <Stack sx={{ gap: 0 }}>
                  <Group sx={{ gap: 10 }}>
                    {SETTINGS_TABS.map(t => (
                      <CustomTab
                        isSelected={t.value === view}
                        key={t.value}
                        label={t.label}
                        onTabChange={() => navigate(`/settings/${t.value}`)}
                        value={t.value}
                      />
                    ))}
                  </Group>
                  <Divider />
                </Stack>
              </Stack>

              {view === 'account' ? (
                <AccountSettings />
              ) : view === 'profile' ? (
                <ProfileSettings />
              ) : (
                view === 'privacy' && <PrivacySettings />
              )}
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default UserSettingsView;
