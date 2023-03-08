import React, { useContext, useState } from 'react';
import { ActionIcon, Avatar, Button, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Leaf, Message, Point, Share } from 'tabler-icons-react';
import CreateComment from './CreateComment';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
const relativeTime = require('dayjs/plugin/relativeTime');

const CommentListItem = ({ comment, replyComments }) => {
  dayjs.extend(relativeTime);
  const { createCommentReaction } = useContext(ReviewsContext);
  const [reactionState, setReactionState] = useState(0);

  const [showReplyBox, setShowReplyBox] = useState(false);
  const replies = replyComments.filter(
    c => c.fkCommentParent === comment.pkComment
  );
  return (
    <Stack sx={{ gap: 0 }}>
      <Group sx={{ gap: 3, placeItems: 'center' }}>
        <Avatar size={45} />
        <Text sx={{ fontSize: 14 }} weight={500}>
          {comment.user.username}
        </Text>
        <Point size={5} />
        <Text color="grey" sx={{ fontSize: 12 }}>
          {dayjs(comment.created).fromNow()}
        </Text>
      </Group>
      <Stack
        sx={{
          marginLeft: 22,
          gap: 10,
          overflow: 'hidden',
          borderLeft: 'solid 2px lightgrey',
          paddingLeft: 25
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
        <Group sx={{ gap: 5 }}>
          <Group sx={{ gap: 5, marginRight: 5 }}>
            <ActionIcon
              color={reactionState === 1 ? 'blue' : 'dark'}
              onClick={() => {
                setReactionState(1);
                createCommentReaction(
                  {
                    fkComment: comment.pkComment,
                    isPositive: true
                  },
                  () => {},
                  () => {
                    setReactionState(0);
                  }
                );
              }}
              size={24}
              variant="transparent"
            >
              <Leaf />
            </ActionIcon>
            <Text size={14} weight={500}>
              {comment.positiveReactionCount -
                comment.negativeReactionCount +
                reactionState}
            </Text>
            <ActionIcon
              color={reactionState === -1 ? 'blue' : 'dark'}
              onClick={() => {
                setReactionState(-1);
                createCommentReaction(
                  {
                    fkComment: comment.pkComment,
                    isPositive: false
                  },
                  () => {},
                  () => {
                    setReactionState(0);
                  }
                );
              }}
              size={24}
              variant="transparent"
            >
              <Leaf
                style={{
                  transform: 'rotate(180deg)',
                  MozTransform: 'rotate(180deg)',
                  WebkitTransform: 'rotate(180deg)',
                  msTransform: 'rotate(180deg)'
                }}
              />
            </ActionIcon>
          </Group>

          <Button
            color="dark"
            leftIcon={<Message size={22} />}
            onClick={() => setShowReplyBox(true)}
            size="xs"
            sx={{ padding: 5 }}
            variant="subtle"
          >
            Reply
          </Button>
          <Button
            color="dark"
            leftIcon={<Share size={22} />}
            size="xs"
            sx={{ padding: 5 }}
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
