import React, { useContext, useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  Message,
  Point,
  Share
} from 'tabler-icons-react';
import DeletePostModal from './DeletePostModal';
import PostMenu from './PostMenu';
import UserPostImageCarousel from './UserPostImageCarousel';
import { USER_POST_TYPE, USER_POST_TYPE_LIST } from '../../../config/constants';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ShareLinkModal from '../../common/ShareLinkModal';
import BrandSidebarInfo from '../brands/BrandSidebarInfo';
import CommentList from '../comments/CommentList';
import CreateComment from '../comments/CreateComment';
import ProductAttribute from '../products/ProductAttribute';
import ProductEffect from '../products/ProductEffect';
import ProductSidebarInfo from '../products/ProductSidebarInfo';
import ReportContentModal from '../reports/ReportContentModal';
const relativeTime = require('dayjs/plugin/relativeTime');

const PostDetails = ({ postItem }) => {
  const navigate = useNavigate();
  dayjs.extend(relativeTime);
  const hasFetched = useRef(false);
  const { state, fetchUserPost, createUserPostReaction } =
    useContext(ReviewsContext);
  const [showSharePostModal, setShowSharePostModal] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reactionState, setReactionState] = useState({
    value: 0,
    deleted: false
  });
  const { uuid } = useParams();
  const { value: userPost } = state.userPost;
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

  useEffect(() => {
    fetchUserPost(uuid);
    hasFetched.current = true;
  }, []);

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

  return (
    <Group
      sx={{
        padding: 20,
        gap: 20,
        placeItems: 'start',
        justifyContent: 'center'
      }}
    >
      {hasFetched.current && !state.userPost.loading && userPost && (
        <>
          <Stack sx={{ gap: 40, flex: 1, maxWidth: 768 }}>
            <Card shadow="xl" sx={{}}>
              <Stack sx={{ gap: 20, flex: 1 }}>
                <Group sx={{ placeItems: 'start', flex: 1 }}>
                  <Stack sx={{ gap: 0, placeItems: 'center', marginLeft: 5 }}>
                    <ActionIcon
                      color={isUpvoted ? 'blue' : 'dark'}
                      disabled={userPost.hidden}
                      onClick={() => createReaction(true)}
                      variant="transparent"
                    >
                      <Leaf />
                    </ActionIcon>
                    <Text weight={500}>
                      {userPost?.positiveReactionCount -
                        userPost?.negativeReactionCount +
                        (!userPost?.userReaction && reactionState.deleted
                          ? 0
                          : reactionState.value)}
                    </Text>
                    <ActionIcon
                      color={isDownVoted ? 'blue' : 'dark'}
                      disabled={userPost.hidden}
                      onClick={() => createReaction(false)}
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

                  <Stack style={{ gap: 20, flex: 1 }}>
                    <Stack
                      sx={{
                        gap: 10,
                        overflow: 'hidden',
                        marginLeft: 5
                      }}
                    >
                      <Stack sx={{ gap: 0 }}>
                        <Text
                          color="grey"
                          size={13}
                          sx={{ flexWrap: 'nowrap', display: 'inline' }}
                        >
                          Posted by{' '}
                          <Group sx={{ gap: 3, display: 'inline-flex' }}>
                            <Text
                              component={Link}
                              sx={{
                                '&:hover': { textDecoration: 'underline' }
                              }}
                              to={`/profile/${userPost.user.username}`}
                            >
                              {userPost.user.username}
                            </Text>
                            <Point size={10} />
                            <Text color="grey" sx={{ fontSize: 12 }}>
                              {dayjs(userPost.created).fromNow()}
                            </Text>
                            {userPost.updated && (
                              <>
                                <Point size={10} />
                                <Text color="grey" sx={{ fontSize: 12 }}>
                                  Updated {dayjs(userPost.updated).fromNow()}
                                </Text>
                              </>
                            )}
                          </Group>
                        </Text>
                        {!userPost.hidden && (
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
                        )}
                      </Stack>

                      {!userPost.hidden &&
                        userPost.fkUserPostType ===
                          USER_POST_TYPE.REVIEW.value &&
                        userPost.userRating && (
                          <>
                            <Rating readOnly value={userPost.userRating} />
                            {userPost.attributes.length > 0 && (
                              <Group sx={{ gap: 10 }}>
                                {userPost.attributes.map((a, index) => (
                                  <React.Fragment
                                    key={a.fkProductAttributeType}
                                  >
                                    <ProductAttribute attribute={a} />
                                    {index !==
                                      userPost.attributes.length - 1 && (
                                      <Point size={10} />
                                    )}
                                  </React.Fragment>
                                ))}
                              </Group>
                            )}
                            {userPost.effectTypes.length > 0 && (
                              <Group sx={{ gap: 10 }}>
                                {userPost.effectTypes.map(e => (
                                  <ProductEffect
                                    fkProductEffectType={e}
                                    key={e}
                                  />
                                ))}
                              </Group>
                            )}
                          </>
                        )}
                      {userPost.hidden ? (
                        <Alert sx={{ margin: 40 }} variant="outline">
                          <Text
                            sx={{ padding: 30, textAlign: 'center' }}
                            weight={500}
                          >
                            Content has been hidden.
                          </Text>
                        </Alert>
                      ) : (
                        <>
                          {userPost.userPostImages.length > 0 && (
                            <UserPostImageCarousel
                              userPostImages={userPost.userPostImages}
                            />
                          )}
                          <Text
                            sx={{
                              fontSize: 16,
                              whiteSpace: 'pre-wrap'
                            }}
                          >
                            {userPost.content}
                          </Text>
                        </>
                      )}
                    </Stack>

                    <Group>
                      <Group sx={{ gap: 5 }}>
                        <Message size={20} />
                        <Text sx={{ fontSize: 14 }} weight={500}>
                          {userPost.comments.length}{' '}
                          {userPost.comments.length === 1
                            ? 'Comment'
                            : 'Comments'}
                        </Text>
                      </Group>
                      {!userPost.hidden && (
                        <>
                          <Group>
                            <Button
                              color="dark"
                              leftIcon={<Share size={20} />}
                              onClick={() => setShowSharePostModal(true)}
                              size="xs"
                              sx={{ fontSize: 14 }}
                              variant="subtle"
                            >
                              Share
                            </Button>
                          </Group>
                          <Group>
                            <PostMenu
                              onAction={action => {
                                switch (action) {
                                  case 'DELETE':
                                    setShowDeletePostModal(true);
                                    break;
                                  case 'REPORT':
                                    setShowReportModal(true);
                                    break;
                                  default:
                                    break;
                                }
                              }}
                              userPost={userPost}
                            />
                          </Group>
                        </>
                      )}
                    </Group>
                    {!userPost.hidden && (
                      <Group
                        sx={{
                          gap: 5,
                          flex: 1
                        }}
                      >
                        <CreateComment fkUserPost={userPost.pkUserPost} />
                      </Group>
                    )}
                  </Stack>
                </Group>
                <CommentList
                  comments={state.comments.value}
                  userPost={userPost}
                />
              </Stack>
            </Card>
          </Stack>
          <Stack style={{ flex: 1, maxWidth: 332 }}>
            {userPost.postItemType === 'product' ? (
              <ProductSidebarInfo product={postItem} />
            ) : (
              userPost.postItemType === 'brand' && (
                <BrandSidebarInfo brand={postItem} />
              )
            )}
          </Stack>
        </>
      )}
      <ShareLinkModal
        onClose={() => setShowSharePostModal(false)}
        opened={showSharePostModal}
        pathname={window.location.pathname}
        title={<Title order={3}>Share Post</Title>}
      />
      <DeletePostModal
        onClose={() => setShowDeletePostModal(false)}
        onDelete={() => navigate('/')}
        opened={showDeletePostModal}
        userPost={userPost}
      />
      <ReportContentModal
        contentType="post"
        onClose={() => setShowReportModal(false)}
        onReport={() => {}}
        opened={showReportModal}
        pkContent={userPost?.pkUserPost}
      />
    </Group>
  );
};

PostDetails.propTypes = {
  isLoading: PropTypes.bool,
  postItem: PropTypes.object
};

export default PostDetails;
