import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Calendar, Star } from 'tabler-icons-react';
import ProfileSidebarInfoProfileActionButton from './ProfileSidebarInfoProfileActionButton';
import ProfileSocialLink from './ProfileSocialLink';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import ReportContentModal from '../reports/ReportContentModal';

const ProfileSidebarInfo = ({ isCurrentUsersProfile, user, isLoading }) => {
  const { state: authState, toggleAuthModal } = useContext(AuthContext);
  const [followState, setFollowState] = useState({
    isLoading: false,
    isFollowing: false,
    hasChanged: false
  });
  const [showReportModal, setShowReportModal] = useState(false);

  return user ? (
    <>
      <Card style={{ padding: 0 }}>
        <Stack sx={{ minHeight: 100, backgroundColor: 'dodgerblue' }} />
        <Stack sx={{ padding: '10px 15px', gap: 10 }}>
          <Stack sx={{ gap: 5, position: 'relative', paddingTop: 10 }}>
            <Card
              shadow="xs"
              style={{ padding: 0 }}
              sx={{ position: 'absolute', top: -90 }}
            >
              <Avatar
                color="gray"
                size={100}
                src={user.avatar}
                sx={{}}
                variant="light"
              />
            </Card>
            {!isCurrentUsersProfile && (
              <Button
                color="dark"
                onClick={() => {
                  if (authState.isAuthenticated) {
                    setShowReportModal(true);
                  } else {
                    toggleAuthModal(true);
                  }
                }}
                sx={{ position: 'absolute', top: -90, right: 0 }}
                variant="outline"
              >
                Report
              </Button>
            )}
            <Group sx={{ justifyContent: 'space-between' }}>
              <Title order={2}>{user.username}</Title>

              <Stack
                sx={mq({
                  width: 175,
                  display: ['none', 'flex', 'none']
                })}
              >
                <ProfileSidebarInfoProfileActionButton
                  followState={followState}
                  isCurrentUsersProfile={isCurrentUsersProfile}
                  setFollowState={setFollowState}
                  user={user}
                />
              </Stack>
            </Group>
            <Group
              sx={mq({
                flexDirection: ['column', 'column', 'row'],
                gap: 10,
                alignItems: 'start'
              })}
            >
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

          {user.bio && (
            <Stack>
              <Text>{user.bio}</Text>
            </Stack>
          )}

          <Stack
            sx={mq({
              margin: 10,
              flex: 1,
              display: ['flex', 'none', 'flex'],
              alignItems: 'center',
              alignSelf: 'stretch'
            })}
          >
            <ProfileSidebarInfoProfileActionButton
              followState={followState}
              isCurrentUsersProfile={isCurrentUsersProfile}
              setFollowState={setFollowState}
              user={user}
            />
          </Stack>
        </Stack>
      </Card>

      {user.userSocialLinks.length > 0 && (
        <Card style={{ padding: 0 }}>
          <Group sx={{ padding: '10px 20px' }}>
            <Title order={4}>Social Links</Title>
          </Group>
          <Divider />
          <Stack sx={{ padding: 20, gap: 10 }}>
            {user.userSocialLinks.map(socialLink => (
              <ProfileSocialLink
                key={socialLink.pkUserSocialLink}
                socialLink={socialLink}
              />
            ))}
          </Stack>
        </Card>
      )}

      <ReportContentModal
        contentType="user"
        onClose={() => setShowReportModal(false)}
        onReport={() => {}}
        opened={showReportModal}
        pkContent={user.pkUser}
      />
    </>
  ) : (
    <>
      <Card style={{ padding: 0 }}>
        <Stack sx={{ minHeight: 100, backgroundColor: 'dodgerblue' }} />
        <Stack sx={{ padding: '10px 15px', gap: 10 }}>
          <Stack sx={{ gap: 10, position: 'relative', paddingTop: 10 }}>
            <Card
              shadow="xs"
              style={{ padding: 0 }}
              sx={{ position: 'absolute', top: -90 }}
            >
              <Avatar color="gray" size={100} sx={{}} variant="light" />
            </Card>
            <Group sx={{ justifyContent: 'space-between', marginTop: 10 }}>
              <Skeleton height={25} width={'50%'} />
              <Stack
                sx={mq({
                  width: 175,
                  display: ['none', 'flex', 'none'],
                  flex: 1
                })}
              >
                <Skeleton
                  height={34}
                  radius={'xl'}
                  sx={{ maxWidth: 250 }}
                  width={'100%'}
                />
              </Stack>
            </Group>
            <Group
              sx={mq({
                flexDirection: ['column', 'column', 'row'],
                gap: 10,
                alignItems: 'start',
                flex: 1
              })}
            >
              <Stack sx={{ flex: 1, gap: 3, alignSelf: 'stretch' }}>
                <Skeleton height={'18'} width={'50%'} />
                <Group sx={{ gap: 5 }}>
                  <Skeleton height={'18'} width={'50%'} />
                </Group>
              </Stack>
              <Stack sx={{ flex: 1, gap: 3, alignSelf: 'stretch' }}>
                <Skeleton height={'18'} width={'50%'} />
                <Group sx={{ gap: 5 }}>
                  <Skeleton height={'18'} width={'50%'} />
                </Group>
              </Stack>
            </Group>
          </Stack>

          <Stack
            sx={mq({
              margin: 10,
              marginTop: 15,
              flex: 1,
              display: ['flex', 'none', 'flex'],
              alignItems: 'center',
              alignSelf: 'stretch'
            })}
          >
            <Skeleton
              height={34}
              radius={'xl'}
              sx={{ maxWidth: 250 }}
              width={'100%'}
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

ProfileSidebarInfo.propTypes = {
  isCurrentUsersProfile: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object
};

export default ProfileSidebarInfo;
