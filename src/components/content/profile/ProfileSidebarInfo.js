import React from 'react';
import { Avatar, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Calendar, Star } from 'tabler-icons-react';

const ProfileSidebarInfo = ({ user, isLoading }) => {
  return (
    user && (
      <>
        <Card style={{ padding: 0 }}>
          <Stack sx={{ minHeight: 100, backgroundColor: 'dodgerblue' }} />
          <Stack sx={{ padding: '10px 15px', gap: 0 }}>
            <Stack sx={{ gap: 5, position: 'relative', paddingTop: 10 }}>
              <Card
                shadow="xs"
                style={{ padding: 0 }}
                sx={{ position: 'absolute', top: -90 }}
              >
                <Avatar color="gray" size={100} sx={{}} variant="light" />
              </Card>
              <Group>
                <Title order={2}>{user.username}</Title>
              </Group>
              <Group>
                <Stack sx={{ flex: 1, gap: 0 }}>
                  <Text weight={500}>Karma</Text>
                  <Group sx={{ gap: 5 }}>
                    <Star color="dodgerblue" size={16} />
                    <Text>{user.karmaPoints}</Text>
                  </Group>
                </Stack>
                <Stack sx={{ flex: 1, gap: 0 }}>
                  <Text weight={500}>Date Joined</Text>
                  <Group sx={{ gap: 5 }}>
                    <Calendar color="dodgerblue" size={16} />
                    <Text>{dayjs(user.created).format('MMMM D, YYYY')}</Text>
                  </Group>
                </Stack>
              </Group>
            </Stack>

            <Stack sx={{ alignItems: 'center' }}>
              <Button
                radius="xl"
                sx={{ margin: '20px 0px', width: '100%', maxWidth: 250 }}
              >
                Follow
              </Button>
            </Stack>
          </Stack>
        </Card>
      </>
    )
  );
};

ProfileSidebarInfo.propTypes = {
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default ProfileSidebarInfo;
