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
import CommentMenu from './CommentMenu';
import CreateComment from './CreateComment';
import DeleteCommentModal from './DeleteCommentModal';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ShareLinkModal from '../../common/ShareLinkModal';
import ReportContentModal from '../reports/ReportContentModal';
const relativeTime = require('dayjs/plugin/relativeTime');

const CommentListItem = ({
  comment,
  replyComments,
  profileSummaryView,
  fkUser
}) => {
  dayjs.extend(relativeTime);
  const { createCommentReaction } = useContext(ReviewsContext);
  const [showSharePostModal, setShowSharePostModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const replies =
    replyComments?.filter(c => c.fkCommentParent === comment.pkComment) ?? [];
  const [reactionState, setReactionState] = useState({
    value: 0,
    deleted: false
  });
  const isUserViewingOwnCommentOnProfile = fkUser === comment.user.pkUser;
  const isDisabled = comment.hidden || comment.deleted;

  const isUpvoted =
    (comment.userReaction?.isPositive && reactionState.value === 0) ||
    (reactionState.value > 0 && !reactionState.deleted);
  const isDownVoted =
    (comment.userReaction &&
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
      comment.userReaction,
      createCommentReaction,
      setReactionState
    );
  };

  return (
    <Stack
      sx={{
        gap: 0,
        paddingLeft: profileSummaryView ? 25 : 0,
        borderLeft: profileSummaryView ? 'dotted 1px lightgrey' : 'none'
      }}
    >
      <Group
        sx={{
          gap: 10,
          padding: 5,
          placeItems: 'center',
          backgroundColor: isUserViewingOwnCommentOnProfile
            ? 'rgba(0,121,211,0.05)'
            : 'none'
        }}
      >
        {!profileSummaryView && (
          <Avatar radius="xl" size={45} src={comment.user.avatar} />
        )}

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
          marginLeft: profileSummaryView ? 0 : 27,
          gap: 10,
          overflow: 'hidden',
          borderLeft: profileSummaryView ? 'none' : 'solid 2px lightgrey',
          paddingLeft: profileSummaryView ? 0 : 30
        }}
      >
        <Stack
          sx={{
            gap: 5,
            padding: '0px 5px',
            backgroundColor: isUserViewingOwnCommentOnProfile
              ? 'rgba(0,121,211,0.05)'
              : 'none'
          }}
        >
          {isDisabled ? (
            <Text
              color="grey"
              size={12}
              sx={{ fontStyle: 'italic' }}
              weight={500}
            >
              Comment has been {comment.deleted ? 'deleted' : 'hidden'}.
            </Text>
          ) : (
            <Text
              sx={{
                fontSize: 14,
                whiteSpace: 'pre-wrap'
              }}
            >
              {comment.content}
            </Text>
          )}
          <Group sx={{ gap: 5 }}>
            {!profileSummaryView && (
              <Group sx={{ gap: 5, marginRight: 5 }}>
                <ActionIcon
                  color={isUpvoted ? 'blue' : 'dark'}
                  disabled={isDisabled}
                  onClick={() => createReaction(true)}
                  size={24}
                  variant="transparent"
                >
                  <Leaf />
                </ActionIcon>
                <Text size={14} weight={500}>
                  {comment.positiveReactionCount -
                    comment.negativeReactionCount +
                    (!comment.userReaction && reactionState.deleted
                      ? 0
                      : reactionState.value)}
                </Text>
                <ActionIcon
                  color={isDownVoted ? 'blue' : 'dark'}
                  disabled={isDisabled}
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
            )}

            {!isDisabled && (
              <>
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
                <Group>
                  <CommentMenu
                    comment={comment}
                    onAction={action => {
                      switch (action) {
                        case 'DELETE':
                          setShowDeleteCommentModal(true);
                          break;
                        case 'REPORT':
                          setShowReportModal(true);
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                </Group>
              </>
            )}
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
        </Stack>
        {replies.map(r => (
          <CommentListItem
            comment={r}
            fkUser={fkUser}
            key={r.pkComment}
            profileSummaryView={profileSummaryView}
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
      <DeleteCommentModal
        comment={comment}
        onClose={() => setShowDeleteCommentModal(false)}
        opened={showDeleteCommentModal}
      />
      <ReportContentModal
        contentType="comment"
        onClose={() => setShowReportModal(false)}
        onReport={() => {}}
        opened={showReportModal}
        pkContent={comment.pkComment}
      />
    </Stack>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.object,
  fkUser: PropTypes.number,
  profileSummaryView: PropTypes.bool,
  replyComments: PropTypes.array
};

export default CommentListItem;
