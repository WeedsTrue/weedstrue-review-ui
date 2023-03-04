import React from 'react';
import { Card, Group, Rating, Stack, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductSidebarInfo from './ProductSidebarInfo';
import PostList from '../posts/PostList';

const ProductDetails = ({ product, isLoading }) => {
  return !isLoading && product ? (
    <Stack sx={{ gap: 20 }}>
      <Card>
        <Stack sx={{ flex: 1, padding: 20, alignItems: 'center', gap: 10 }}>
          <Title sx={{ textAlign: 'center' }}>{product.name}</Title>
          <Rating readOnly value={4}></Rating>
        </Stack>
      </Card>
      <Group
        sx={{
          margin: ' auto',
          width: '100%',
          maxWidth: 1200,
          gap: 20,
          placeItems: 'start'
        }}
      >
        <Stack style={{ flex: 5 }}>
          <PostList userPosts={product.userPosts} />
        </Stack>

        <Stack style={{ flex: 2 }}>
          <ProductSidebarInfo product={product} />
        </Stack>
      </Group>
    </Stack>
  ) : (
    <></>
  );
};

ProductDetails.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

export default ProductDetails;
