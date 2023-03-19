import React, { useContext, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Leaf, Message, Point, Share } from 'tabler-icons-react';
import CreateComment from './CreateComment';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ShareLinkModal from '../../common/ShareLinkModal';
const relativeTime = require('dayjs/plugin/relativeTime');

const CommentListItem = ({ comment, replyComments }) => {
  dayjs.extend(relativeTime);
  const { createCommentReaction } = useContext(ReviewsContext);
  const [showSharePostModal, setShowSharePostModal] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const replies = replyComments.filter(
    c => c.fkCommentParent === comment.pkComment
  );
  const [reactionState, setReactionState] = useState({
    value: 0,
    deleted: false
  });

  const isUpvoted =
    (comment?.userReaction?.isPositive && reactionState.value === 0) ||
    (reactionState.value > 0 && !reactionState.deleted);
  const isDownVoted =
    (comment?.userReaction &&
      !comment.userReaction.isPositive &&
      reactionState.value === 0) ||
    (reactionState.value < 0 && !reactionState.deleted);

  const createReaction = isPositive => {
    reactToItem(
      {
        isUpvoted,
        isDownVoted,
        fkComment: comment.pkComment,
        fkUserPostReaction: comment.userReaction?.pkUserReaction,
        isPositive,
        deleted: reactionState.deleted
      },
      comment?.userReaction,
      createCommentReaction,
      setReactionState
    );
  };

  return (
    <Stack sx={{ gap: 0 }}>
      <Group sx={{ gap: 10, placeItems: 'center' }}>
        <Avatar radius="xl" size={45} />
        <Group sx={{ gap: 3 }}>
          <Text sx={{ fontSize: 14 }} weight={500}>
            {comment.user.username}
          </Text>
          <Point size={5} />
          <Text color="grey" sx={{ fontSize: 12 }}>
            {dayjs(comment.created).fromNow()}
          </Text>
        </Group>
      </Group>
      <Stack
        sx={{
          marginLeft: 22,
          gap: 10,
          overflow: 'hidden',
          borderLeft: 'solid 2px lightgrey',
          paddingLeft: 30
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
              color={isUpvoted ? 'blue' : 'dark'}
              onClick={() => createReaction(true)}
              size={24}
              variant="transparent"
            >
              <Leaf />
            </ActionIcon>
            <Text size={14} weight={500}>
              {comment.positiveReactionCount -
                comment.negativeReactionCount +
                (!comment?.userReaction && reactionState.deleted
                  ? 0
                  : reactionState.value)}
            </Text>
            <ActionIcon
              color={isDownVoted ? 'blue' : 'dark'}
              onClick={() => createReaction(false)}
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
            onClick={() => setShowSharePostModal(true)}
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
      <ShareLinkModal
        onClose={() => setShowSharePostModal(false)}
        opened={showSharePostModal}
        pathname={window.location.pathname}
        title={<Title order={3}>Share Post</Title>}
      />
    </Stack>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.object,
  replyComments: PropTypes.array
};

export default CommentListItem;
