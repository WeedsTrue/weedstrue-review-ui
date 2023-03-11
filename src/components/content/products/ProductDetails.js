import React, { useState } from 'react';
import { Card, Group, Rating, Skeleton, Stack, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductSidebarInfo from './ProductSidebarInfo';
import { userPostSort } from '../../../helpers/sortHelper';
import PostList from '../posts/PostList';

const ProductDetails = ({ product, isLoading }) => {
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null,
    lastUserPost: null,
    totalCount: 0,
    isLoading: false
  });

  const filteredPosts = product
    ? product.userPosts.filter(
        p =>
          !filterState.fkUserPostType ||
          filterState.fkUserPostType === p.fkUserPostType
      )
    : // .sort((a, b) => userPostSort(a, b, filterState.sortBy))
      [];

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    setFilterState(newState);
  };

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
        <Stack style={{ flex: 1, maxWidth: 768 }}>
          <PostList
            filterState={filterState}
            onFilterChange={onFilterChange}
            userPosts={filteredPosts}
          />
        </Stack>

        <Stack style={{ flex: 1, maxWidth: 332 }}>
          <ProductSidebarInfo product={product} />
        </Stack>
      </Group>
    </Stack>
  ) : (
    <Stack sx={{ gap: 20 }}>
      <Card>
        <Stack sx={{ flex: 1, padding: 20, alignItems: 'center', gap: 10 }}>
          <Skeleton height={45} width="25%" />
          <Skeleton height={20} width={100} />
        </Stack>
      </Card>
      <Group
        sx={{
          gap: 20,
          placeItems: 'start',
          justifyContent: 'center'
        }}
      >
        <Stack style={{ flex: 1, maxWidth: 768 }}>
          <PostList isLoading />
        </Stack>

        <Stack style={{ flex: 1, maxWidth: 332 }}>
          <ProductSidebarInfo isLoading />
        </Stack>
      </Group>
    </Stack>
  );
};

ProductDetails.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

export default ProductDetails;
