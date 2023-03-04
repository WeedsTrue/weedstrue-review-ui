import React from 'react';
import { Card, Group, Rating, Stack, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import BrandSidebarInfo from './BrandSidebarInfo';
import PostList from '../posts/PostList';

const BrandDetails = ({ brand, isLoading }) => {
  return !isLoading && brand ? (
    <Stack sx={{ gap: 10, flex: 1 }}>
      <Card>
        <Stack sx={{ flex: 1, padding: 20, alignItems: 'center', gap: 10 }}>
          <Title sx={{ textAlign: 'center' }}>{brand.name}</Title>
          <Rating readOnly value={4}></Rating>
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
        <Stack style={{ flex: 1, maxWidth: 900 }}>
          <PostList userPosts={brand.userPosts} />
        </Stack>

        <Stack style={{ flex: 1, maxWidth: 300 }}>
          <BrandSidebarInfo brand={brand} />
        </Stack>
      </Group>
    </Stack>
  ) : (
    <></>
  );
};

BrandDetails.propTypes = {
  brand: PropTypes.object,
  isLoading: PropTypes.bool
};

export default BrandDetails;
