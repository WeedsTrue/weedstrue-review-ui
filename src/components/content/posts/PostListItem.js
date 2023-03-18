import React, { useContext, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Dots, Leaf, Message, Point, Share } from 'tabler-icons-react';
import { USER_POST_TYPE, USER_POST_TYPE_LIST } from '../../../config/constants';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ShareLinkModal from '../../common/ShareLinkModal';

const PostListItem = ({ userPost }) => {
  const navigate = useNavigate();
  const { createUserPostReaction } = useContext(ReviewsContext);
  const [showSharePostModal, setShowSharePostModal] = useState(false);
  const [reactionState, setReactionState] = useState({
    value: 0,
    deleted: false
  });

  const postLink = userPost
    ? `/${userPost.postItemType}s/${userPost.postItemUuid}/posts/${
        userPost.uuid
      }/${userPost.title
        .replace(/[^a-zA-Z' ']/g, '')
        .split(' ')
        .slice(0, 6)
        .join('_')
        .toLowerCase()}`
    : '';

  const postType =
    userPost &&
    USER_POST_TYPE_LIST.find(t => t.value === userPost.fkUserPostType);

  const isUpvoted =
    (userPost?.userReaction?.isPositive && reactionState.value === 0) ||
    (reactionState.value > 0 && !reactionState.deleted);
  const isDownVoted =
    (userPost?.userReaction &&
      !userPost.userReaction.isPositive &&
      reactionState.value === 0) ||
    (reactionState.value < 0 && !reactionState.deleted);

  const createReaction = isPositive => {
    reactToItem(
      {
        isUpvoted,
        isDownVoted,
        fkUserPost: userPost.pkUserPost,
        isPositive,
        deleted: reactionState.deleted
      },
      userPost?.userReaction,
      createUserPostReaction,
      setReactionState
    );
  };

  return userPost ? (
    <>
      <Card component={Link} to={postLink}>
        <Group sx={{ alignItems: 'start' }}>
          <Stack sx={{ gap: 0, placeItems: 'center', marginLeft: 5 }}>
            <ActionIcon
              color={isUpvoted ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                createReaction(true);
              }}
              variant="transparent"
            >
              <Leaf />
            </ActionIcon>
            <Text weight={500}>
              {userPost.positiveReactionCount -
                userPost.negativeReactionCount +
                (!userPost?.userReaction && reactionState.deleted
                  ? 0
                  : reactionState.value)}
            </Text>
            <ActionIcon
              color={isDownVoted ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                createReaction(false);
              }}
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
          </Stack>
          <Stack
            sx={{ gap: 10, textDecoration: 'none', color: '#000', flex: 1 }}
          >
            <Stack
              sx={{
                gap: 5,
                overflow: 'hidden',
                marginLeft: 5
              }}
            >
              <Stack sx={{ gap: 0 }}>
                <Text color="grey" size={13} sx={{ flexWrap: 'nowrap' }}>
                  Posted by{' '}
                  <Text
                    onClick={e => {
                      e.preventDefault();
                      navigate(`/profile/${userPost.user.username}`);
                    }}
                    sx={{
                      display: 'inline',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {userPost.user.username}
                  </Text>
                </Text>
                <Group
                  sx={{
                    gap: 5,
                    flexWrap: 'nowrap',
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                    alignItems: 'start'
                  }}
                >
                  <Title
                    order={4}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {userPost.title}
                  </Title>
                  <Badge
                    color={postType.color}
                    size="lg"
                    sx={{ minWidth: 100 }}
                    variant="filled"
                  >
                    {postType.label}
                  </Badge>
                </Group>
              </Stack>

              <Group sx={{ gap: 5 }}>
                <Text color="dodgerblue" size={14}>
                  {userPost.postItemName}
                </Text>
                {userPost.postItemSecondaryName && (
                  <>
                    <Point size={5} />
                    <Text color="dodgerblue" size={14}>
                      {userPost.postItemUuid}
                    </Text>
                  </>
                )}
              </Group>
              {userPost.fkUserPostType === USER_POST_TYPE.REVIEW.value &&
                userPost.userRating && (
                  <Rating readOnly value={userPost.userRating} />
                )}
              <Text
                sx={{
                  fontSize: 14,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {userPost.content}
              </Text>
            </Stack>
            <Group>
              <Group sx={{ gap: 5 }}>
                <Button
                  color="dark"
                  leftIcon={<Message />}
                  size="xs"
                  sx={{ padding: 3 }}
                  variant="subtle"
                >
                  {userPost.commentCount}{' '}
                  {userPost.commentCount === 1 ? 'Comment' : 'Comments'}
                </Button>
              </Group>
              <Group>
                <Button
                  color="dark"
                  leftIcon={<Share />}
                  onClick={e => {
                    e.preventDefault();
                    setShowSharePostModal(true);
                  }}
                  size="xs"
                  sx={{ padding: 3 }}
                  variant="subtle"
                >
                  Share
                </Button>
              </Group>
              <Group>
                <Button
                  color="dark"
                  size="xs"
                  sx={{ padding: 3 }}
                  variant="subtle"
                >
                  <Dots />
                </Button>
              </Group>
            </Group>
          </Stack>
        </Group>
      </Card>
      <ShareLinkModal
        onClose={() => setShowSharePostModal(false)}
        opened={showSharePostModal}
        pathname={postLink}
        title={<Title order={3}>Share Post</Title>}
      />
    </>
  ) : (
    <Card>
      <Stack sx={{ gap: 10, textDecoration: 'none', color: '#000' }}>
        <Stack
          sx={{
            gap: 10,
            overflow: 'hidden'
          }}
        >
          <Skeleton height={26} radius="xl" width="40%" />
          <Skeleton height={20} radius="xl" width={100} />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} radius="xl" />
          <Skeleton height={10} radius="xl" width="70%" />
        </Stack>
        <Group>
          <Group sx={{ gap: 5 }}>
            <Skeleton height={20} width={100} />
          </Group>
          <Group>
            <Skeleton height={20} width={64} />
          </Group>
          <Group>
            <Skeleton height={20} width={24} />
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

PostListItem.propTypes = {
  userPost: PropTypes.object
};

export default PostListItem;
