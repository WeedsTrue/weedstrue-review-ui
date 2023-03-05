import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Rating,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Dots, Leaf, Message, Share } from 'tabler-icons-react';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import BrandSidebarInfo from '../brands/BrandSidebarInfo';
import CommentList from '../comments/CommentList';
import CreateComment from '../comments/CreateComment';
import ProductSidebarInfo from '../products/ProductSidebarInfo';

const PostDetails = ({ postItem, isLoading }) => {
  const hasFetched = useRef(false);
  const { state, fetchUserPost, createUserPostReaction } =
    useContext(ReviewsContext);
  const [reactionState, setReactionState] = useState(0);
  const { uuid } = useParams();
  const { value: userPost } = state.userPost;

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
                    <Stack>
                      <Title
                        order={4}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {userPost.title}
                      </Title>
                      <Rating readOnly value={4} />
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
