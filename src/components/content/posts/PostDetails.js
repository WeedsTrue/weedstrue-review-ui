import React, { useContext, useEffect, useRef } from 'react';
import { Button, Card, Group, Rating, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Dots, Message, Share } from 'tabler-icons-react';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import BrandSidebarInfo from '../brands/BrandSidebarInfo';
import CommentList from '../comments/CommentList';
import ProductSidebarInfo from '../products/ProductSidebarInfo';

const PostDetails = ({ postItem, isLoading }) => {
  const hasFetched = useRef(false);
  const { state, fetchUserPost } = useContext(ReviewsContext);
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
          <Stack sx={{ gap: 40, flex: 1, maxWidth: 900 }}>
            <Card shadow="xl" sx={{}}>
              <Stack sx={{ gap: 20 }}>
                <Stack sx={{ gap: 10 }}>
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
                      {userPost.comments.length === 1 ? 'Comment' : 'Comments'}
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
                <CommentList
                  comments={state.comments.value}
                  userPost={userPost}
                />
              </Stack>
            </Card>
          </Stack>
          <Stack style={{ flex: 1, maxWidth: 300 }}>
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
