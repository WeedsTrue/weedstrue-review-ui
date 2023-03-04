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
          gap: 20,
          placeItems: 'start',
          justifyContent: 'center'
        }}
      >
        <Stack style={{ flex: 1, maxWidth: 900 }}>
          <PostList userPosts={product.userPosts} />
        </Stack>

        <Stack style={{ flex: 1, maxWidth: 300 }}>
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
