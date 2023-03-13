import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Rating,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Dots, Leaf, Message, Point, Share } from 'tabler-icons-react';
import { USER_POST_TYPE, USER_POST_TYPE_LIST } from '../../../config/constants';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import BrandSidebarInfo from '../brands/BrandSidebarInfo';
import CommentList from '../comments/CommentList';
import CreateComment from '../comments/CreateComment';
import ProductAttribute from '../products/ProductAttribute';
import ProductEffect from '../products/ProductEffect';
import ProductSidebarInfo from '../products/ProductSidebarInfo';

const PostDetails = ({ postItem }) => {
  const hasFetched = useRef(false);
  const { state, fetchUserPost, createUserPostReaction } =
    useContext(ReviewsContext);
  const [reactionState, setReactionState] = useState(0);
  const { uuid } = useParams();
  const { value: userPost } = state.userPost;
  const postType =
    userPost &&
    USER_POST_TYPE_LIST.find(t => t.value === userPost.fkUserPostType);

  useEffect(() => {
    fetchUserPost(uuid);
    hasFetched.current = true;
  }, []);

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
                      color={reactionState === 1 ? 'blue' : 'dark'}
                      onClick={() => {
                        setReactionState(1);
                        createUserPostReaction(
                          {
                            fkUserPost: userPost.pkUserPost,
                            isPositive: true
                          },
                          () => {},
                          () => {
                            setReactionState(0);
                          }
                        );
                      }}
                      variant="transparent"
                    >
                      <Leaf />
                    </ActionIcon>
                    <Text weight={500}>
                      {userPost.positiveReactionCount -
                        userPost.negativeReactionCount +
                        reactionState}
                    </Text>
                    <ActionIcon
                      color={reactionState === -1 ? 'blue' : 'dark'}
                      onClick={() => {
                        setReactionState(-1);
                        createUserPostReaction(
                          {
                            fkUserPost: userPost.pkUserPost,
                            isPositive: false
                          },
                          () => {},
                          () => {
                            setReactionState(0);
                          }
                        );
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

                  <Stack style={{ gap: 20, flex: 1 }}>
                    <Stack
                      sx={{
                        gap: 10,
                        overflow: 'hidden',
                        marginLeft: 5
                      }}
                    >
                      <Stack sx={{ gap: 0 }}>
                        <Text color="grey" size={13}>
                          Posted by{' '}
                          <Text
                            component={Link}
                            sx={{ '&:hover': { textDecoration: 'underline' } }}
                            to={`/profile/${userPost.user.username}`}
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

                      {userPost.fkUserPostType ===
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
                      <Text
                        sx={{
                          fontSize: 16,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {userPost.content}
                      </Text>
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
                      <Group>
                        <Button
                          color="dark"
                          leftIcon={<Share size={20} />}
                          size="xs"
                          sx={{ fontSize: 14 }}
                          variant="subtle"
                        >
                          Share
                        </Button>
                      </Group>
                      <Group>
                        <Button color="dark" size="xs" variant="subtle">
                          <Dots />
                        </Button>
                      </Group>
                    </Group>
                    <Group
                      sx={{
                        gap: 5,
                        flex: 1
                      }}
                    >
                      <CreateComment fkUserPost={userPost.pkUserPost} />
                    </Group>
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
    </Group>
  );
};

PostDetails.propTypes = {
  isLoading: PropTypes.bool,
  postItem: PropTypes.object
};

export default PostDetails;
