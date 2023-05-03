import React from 'react';
import { Card, Divider, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'tabler-icons-react';
import { getUserPostLink } from '../../../helpers/format';
import CommentListItem from '../comments/CommentListItem';
const relativeTime = require('dayjs/plugin/relativeTime');

const ProfileCommentListItem = ({ comment, fkUser }) => {
  dayjs.extend(relativeTime);

  return comment ? (
    <Card
      component={Link}
      shadow="xl"
      style={{ padding: 5 }}
      sx={{ display: 'flex' }}
      to={getUserPostLink(comment?.userPost)}
    >
      <Stack sx={{ flex: 1, gap: 10 }}>
        <Group sx={{ marginLeft: 10 }}>
          <Message />
          <Stack sx={{ gap: 0 }}>
            <Group sx={{ gap: 5 }}>
              <Text sx={{ fontSize: 14, color: 'dodgerblue' }} weight={500}>
                {comment.user.username}
              </Text>{' '}
              <Text>commented on {comment.userPost.title}</Text>
            </Group>
            <Group>
              <Text color="grey" size={14}>
                Posted by {comment.userPost.user.username}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Divider />
        <Stack sx={{ margin: '5px 20px' }}>
          <Stack>
            {comment.commentParent ? (
              <CommentListItem
                comment={comment.commentParent}
                fkUser={fkUser}
                profileSummaryView
                replyComments={[comment]}
              />
            ) : (
              <CommentListItem
                comment={comment}
                fkUser={fkUser}
                profileSummaryView
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  ) : null;
};

ProfileCommentListItem.propTypes = {
  comment: PropTypes.object,
  fkUser: PropTypes.number,
  replyComments: PropTypes.array
};

export default ProfileCommentListItem;
