import React, { useState } from 'react';
import { Avatar, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Calendar, Star } from 'tabler-icons-react';
import ReportContentModal from '../reports/ReportContentModal';

const ProfileSidebarInfo = ({ isCurrentUsersProfile, user, isLoading }) => {
  const [showReportModal, setShowReportModal] = useState(false);

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
              {!isCurrentUsersProfile && (
                <Button
                  color="dark"
                  onClick={() => setShowReportModal(true)}
                  sx={{ position: 'absolute', top: -90, right: 0 }}
                  variant="outline"
                >
                  Report
                </Button>
              )}
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
              {isCurrentUsersProfile ? (
                <Button
                  radius="xl"
                  sx={{ margin: '20px 0px', width: '100%', maxWidth: 250 }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  radius="xl"
                  sx={{ margin: '20px 0px', width: '100%', maxWidth: 250 }}
                >
                  Follow
                </Button>
              )}
            </Stack>
          </Stack>
        </Card>
        <ReportContentModal
          contentType="user"
          onClose={() => setShowReportModal(false)}
          onReport={() => {}}
          opened={showReportModal}
          pkContent={user.pkUser}
        />
      </>
    )
  );
};

ProfileSidebarInfo.propTypes = {
  isCurrentUsersProfile: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default ProfileSidebarInfo;
