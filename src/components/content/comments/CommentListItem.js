import React, { useState } from 'react';
import { Avatar, Button, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Message, Point, Share } from 'tabler-icons-react';
import CreateComment from './CreateComment';
const relativeTime = require('dayjs/plugin/relativeTime');

const CommentListItem = ({ comment, replyComments }) => {
  dayjs.extend(relativeTime);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const replies = replyComments.filter(
    c => c.fkCommentParent === comment.pkComment
  );
  return (
    <Stack sx={{ gap: 0 }}>
      <Group sx={{ gap: 3, placeItems: 'center' }}>
        <Avatar size={40} />
        <Text sx={{ fontSize: 14 }} weight={500}>
          Gmoney
        </Text>
        <Point size={5} />
        <Text color="grey" sx={{ fontSize: 12 }}>
          {dayjs(comment.created).fromNow()}
        </Text>
      </Group>
      <Stack
        sx={{
          marginLeft: 20,
          gap: 10,
          overflow: 'hidden',
          borderLeft: 'solid 2px lightgrey',
          paddingLeft: 20
        }}
      >
        <Text
          sx={{
            fontSize: 14,
            whiteSpace: 'pre-wrap'
          }}
        >
          {comment.content}
        </Text>
        <Group>
          <Button
            color="dark"
            leftIcon={<Message />}
            onClick={() => setShowReplyBox(true)}
            radius="xl"
            size="xs"
            variant="subtle"
          >
            Reply
          </Button>
          <Button
            color="dark"
            leftIcon={<Share />}
            radius="xl"
            size="xs"
            variant="subtle"
          >
            Share
          </Button>
        </Group>
        {showReplyBox && (
          <Stack
            sx={{
              marginLeft: 20,
              gap: 10,
              overflow: 'hidden',
              borderLeft: 'solid 2px lightgrey',
              paddingLeft: 20
            }}
          >
            <CreateComment
              fkCommentParent={comment.pkComment}
              fkUserPost={comment.fkUserPost}
              onCancel={() => setShowReplyBox(false)}
              onSuccess={() => setShowReplyBox(false)}
            />
          </Stack>
        )}
        {replies.map(r => (
          <CommentListItem
            comment={r}
            key={r.pkComment}
            replyComments={replyComments}
          />
        ))}
      </Stack>
    </Stack>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.object,
  replyComments: PropTypes.array
};

export default CommentListItem;
