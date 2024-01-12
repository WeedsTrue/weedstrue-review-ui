import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Leaf,
  Message,
  Point,
  Share
} from 'tabler-icons-react';
import DeletePostModal from './DeletePostModal';
import PostMenu from './PostMenu';
import UserPostImageCarousel from './UserPostImageCarousel';
import { USER_POST_TYPE, USER_POST_TYPE_LIST } from '../../../config/constants';
import { mq } from '../../../config/theme';
import { stripDateOfUTC } from '../../../helpers/format';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as AuthContext } from '../../../providers/AuthProvider';
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
  const { state: authState, toggleAuthModal } = useContext(AuthContext);
  const { state, fetchUserPost, createUserPostReaction } =
    useContext(ReviewsContext);
  const [showMobilePostSidebarInfo, setShowMobilePostSidebarInfo] =
    useState(false);
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
    if (authState.isAuthenticated) {
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
    } else {
      toggleAuthModal(true);
    }
  };

  return (
    <Group
      sx={mq({
        flex: [1, 1, 'unset'],
        padding: [0, 0, 20],
        minWidth: 0,
        gap: [0, 0, 20],
        placeItems: 'start',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: ['column', 'column', 'row-reverse'],
        width: '100%'
      })}
    >
      {hasFetched.current && !state.userPost.loading && userPost ? (
        <>
          <Stack
            sx={mq({
              display: ['flex', 'flex', 'none'],
              gap: 0,
              width: '100%'
            })}
          >
            <Card
              sx={mq({
                padding: [
                  '10px !important',
                  '10px !important',
                  '20px !important'
                ]
              })}
            >
              <Group sx={{ justifyContent: 'space-between' }}>
                <Text weight={500}>
                  {userPost.postItemType === 'product'
                    ? 'Product Information'
                    : 'Brand Information'}
                </Text>
                <ActionIcon
                  color="dark"
                  onClick={() =>
                    setShowMobilePostSidebarInfo(!showMobilePostSidebarInfo)
                  }
                >
                  {showMobilePostSidebarInfo ? <ChevronUp /> : <ChevronDown />}
                </ActionIcon>
              </Group>
            </Card>
            <Divider />
          </Stack>
          <Stack
            style={{ flex: 1 }}
            sx={mq({
              display: showMobilePostSidebarInfo
                ? 'flex'
                : ['none', 'none', 'flex'],
              flex: 1,
              minWidth: 0,
              maxWidth: ['unset', 'unset', 332],
              gap: [0, 0, 20]
            })}
          >
            {userPost.postItemType === 'product' ? (
              <ProductSidebarInfo product={postItem} />
            ) : (
              userPost.postItemType === 'brand' && (
                <BrandSidebarInfo brand={postItem} />
              )
            )}
            <Divider sx={mq({ display: ['flex', 'flex', 'none'] })} />
          </Stack>

          <Stack
            sx={mq({
              gap: [0, 0, 40],
              flex: 1,
              minWidth: 0,
              maxWidth: ['unset', 'unset', 768],
              width: '100%'
            })}
          >
            <Card
              shadow="xl"
              sx={mq({
                display: 'flex',
                flex: 1,
                minWidth: 0,
                padding: [
                  '10px !important',
                  '10px !important',
                  '20px !important'
                ]
              })}
            >
              <Stack sx={{ gap: 20, flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <Group sx={{ placeItems: 'start' }}>
                  <Stack
                    sx={mq({
                      gap: 0,
                      placeItems: 'center',
                      marginLeft: 5,
                      display: ['none', 'none', 'none', 'flex']
                    })}
                  >
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

                  <Stack sx={mq({ gap: 10, flex: 1 })}>
                    <Stack
                      sx={mq({
                        gap: 5,
                        overflow: 'hidden',
                        marginLeft: 5
                      })}
                    >
                      <Stack sx={{ gap: 0 }}>
                        <Text
                          color="grey"
                          size={13}
                          sx={{ flexWrap: 'nowrap', display: 'inline' }}
                        >
                          <Group sx={{ gap: 3, display: 'inline-flex' }}>
                            <Text
                              component={Link}
                              sx={{
                                '&:hover': { textDecoration: 'underline' }
                              }}
                              to={`/profile/${userPost.user.username}`}
                            >
                              Posted by {userPost.user.username}
                            </Text>
                            <Point size={10} />
                            <Text color="grey" sx={{ fontSize: 12 }}>
                              {dayjs(
                                `${stripDateOfUTC(userPost.created)}Z`
                              ).fromNow()}
                            </Text>
                            {userPost.updated && (
                              <>
                                <Point size={10} />
                                <Text color="grey" sx={{ fontSize: 12 }}>
                                  Updated{' '}
                                  {dayjs(
                                    `${stripDateOfUTC(userPost.updated)}Z`
                                  ).fromNow()}
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
                              sx={mq({
                                display: ['none', 'none', 'flex'],
                                minWidth: 100
                              })}
                              variant="filled"
                            >
                              {postType.label}
                            </Badge>
                          </Group>
                        )}
                      </Stack>
                      <Group
                        sx={mq({
                          display: ['flex', 'flex', 'none']
                        })}
                      >
                        <Badge
                          color={postType.color}
                          size="lg"
                          sx={mq({
                            display: ['flex', 'flex', 'none']
                          })}
                          variant="filled"
                        >
                          {postType.label}
                        </Badge>
                      </Group>
                      {!userPost.hidden &&
                        userPost.fkUserPostType ===
                          USER_POST_TYPE.REVIEW.value &&
                        userPost.userRating && (
                          <>
                            <Rating readOnly value={userPost.userRating} />
                            {userPost.attributes.length > 0 && (
                              <Group sx={{ gap: 0 }}>
                                {userPost.attributes.map((a, index) => (
                                  <React.Fragment
                                    key={a.fkProductAttributeType}
                                  >
                                    <ProductAttribute
                                      attribute={a}
                                      sx={mq({ marginRight: [5, 5, 10] })}
                                    />
                                    {index !==
                                      userPost.attributes.length - 1 && (
                                      <Stack
                                        sx={mq({ marginRight: [5, 5, 10] })}
                                      >
                                        <Point size={10} />
                                      </Stack>
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
                            <Stack sx={{ padding: '5px 0px' }}>
                              <UserPostImageCarousel
                                userPostImages={userPost.userPostImages}
                              />
                            </Stack>
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
                      <Group
                        sx={mq({
                          gap: 0,
                          placeItems: 'center',
                          marginLeft: 5,
                          display: ['flex', 'flex', 'flex', 'none']
                        })}
                      >
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
                      </Group>
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
                          <Group sx={mq({ display: ['none', 'flex'] })}>
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
                                    if (authState.isAuthenticated) {
                                      setShowReportModal(true);
                                    } else {
                                      toggleAuthModal(true);
                                    }
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
        </>
      ) : (
        <>
          <Stack sx={mq({ display: ['flex', 'flex', 'none'], gap: 0 })}>
            <Card
              sx={mq({
                padding: [
                  '10px !important',
                  '10px !important',
                  '20px !important'
                ]
              })}
            >
              <Group sx={{ justifyContent: 'space-between' }}>
                <Skeleton height={24} width={'50%'} />
              </Group>
            </Card>
            <Divider />
          </Stack>
          <Stack
            style={{ flex: 1 }}
            sx={mq({
              display: showMobilePostSidebarInfo
                ? 'flex'
                : ['none', 'none', 'flex'],
              flex: 1,
              maxWidth: ['unset', 'unset', 332],
              gap: [0, 0, 20]
            })}
          >
            <ProductSidebarInfo />
            <Divider sx={mq({ display: ['flex', 'flex', 'none'] })} />
          </Stack>

          <Stack
            sx={mq({
              gap: [0, 0, 40],
              flex: 1,
              maxWidth: ['unset', 'unset', 768]
            })}
          >
            <Card
              shadow="xl"
              style={{ display: 'flex' }}
              sx={mq({
                flex: 1,
                padding: [
                  '10px !important',
                  '10px !important',
                  '20px !important'
                ]
              })}
            >
              <Stack sx={{ gap: 20, flex: 1 }}>
                <Group sx={{ placeItems: 'start', flex: 1 }}>
                  <Stack sx={mq({ gap: 10, flex: 1, alignSelf: 'stretch' })}>
                    <Stack
                      sx={mq({
                        flex: 1,
                        gap: 5,
                        overflow: 'hidden',
                        marginLeft: 5,
                        minHeight: []
                      })}
                    >
                      <Stack sx={{ gap: 5 }}>
                        <Text
                          color="grey"
                          size={13}
                          sx={{ flexWrap: 'nowrap', display: 'inline' }}
                        >
                          <Group sx={{ gap: 3, display: 'inline-flex' }}>
                            <Skeleton height={14} width={150} />
                            <Point size={10} />
                            <Skeleton height={14} width={50} />
                          </Group>
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
                          <Skeleton height={24} width={'80%'} />
                          <Skeleton
                            height={26}
                            radius={'xl'}
                            sx={mq({
                              display: ['none', 'none', 'flex'],
                              minWidth: 100
                            })}
                            width={100}
                          />
                        </Group>
                      </Stack>
                      <Group
                        sx={mq({
                          display: ['flex', 'flex', 'none']
                        })}
                      >
                        <Skeleton height={26} radius={'xl'} width={100} />
                      </Group>
                    </Stack>

                    <Group>
                      <Group sx={{ gap: 10 }}>
                        <Skeleton height={26} radius={'xl'} width={100} />
                        <Group sx={mq({ display: ['none', 'flex'] })}>
                          <Skeleton height={26} radius={'xl'} width={75} />
                        </Group>
                        <Skeleton height={26} radius={'xl'} width={50} />
                      </Group>
                    </Group>
                  </Stack>
                </Group>
              </Stack>
            </Card>
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
