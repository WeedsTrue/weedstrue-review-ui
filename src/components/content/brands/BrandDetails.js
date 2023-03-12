import React, { useState } from 'react';
import { Card, Group, Rating, Skeleton, Stack, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import BrandSidebarInfo from './BrandSidebarInfo';
import PostList from '../posts/PostList';

const BrandDetails = ({ brand, isLoading }) => {
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null,
    totalCount: 0,
    isLoading: false
  });

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    setFilterState(newState);
  };

  return !isLoading && brand ? (
    <Stack sx={{ gap: 10, flex: 1 }}>
      <Card>
        <Stack sx={{ flex: 1, padding: 20, alignItems: 'center', gap: 10 }}>
          <Title sx={{ textAlign: 'center' }}>{brand.name}</Title>
          <Rating fractions={2} readOnly value={brand.rating}></Rating>
        </Stack>
      </Card>
      <Group
        id="testing"
        sx={{
          gap: 20,
          placeItems: 'start',
          justifyContent: 'center',
          padding: 10
        }}
      >
        <Stack style={{ flex: 1, maxWidth: 768 }}>
          <PostList
            filterState={filterState}
            onFilterChange={onFilterChange}
            userPosts={brand.userPosts}
          />
        </Stack>

        <Stack style={{ flex: 1, maxWidth: 332 }}>
          <BrandSidebarInfo brand={brand} />
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
          <BrandSidebarInfo />
        </Stack>
      </Group>
    </Stack>
  );
};

BrandDetails.propTypes = {
  brand: PropTypes.object,
  isLoading: PropTypes.bool
};

export default BrandDetails;
