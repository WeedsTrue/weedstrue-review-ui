import React from 'react';
import { Card, Rating, Skeleton, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import PostList from '../posts/PostList';

const ProductDetails = ({ product, isLoading }) => {
  return (
    <Stack sx={{ gap: 40 }}>
      <Card sx={{ margin: '20px auto', width: '100%', maxWidth: 900 }}>
        {!isLoading && product ? (
          <>
            <Stack sx={{ flex: 1, padding: 30, alignItems: 'center', gap: 10 }}>
              <Title sx={{ textAlign: 'center' }}>{product.name}</Title>
              <Rating readOnly value={4}></Rating>
            </Stack>
            <Stack sx={{ gap: 20 }}>
              <Text weight={500}>Reviews</Text>
              <PostList userPosts={product.userPosts} />
            </Stack>
          </>
        ) : (
          <>
            <Skeleton height={44} width={'35%'} />
            <Skeleton height={18} width={100} />
          </>
        )}
      </Card>
    </Stack>
  );
};

ProductDetails.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

export default ProductDetails;
