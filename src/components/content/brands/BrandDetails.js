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
          margin: '10px auto',
          width: '100%',
          maxWidth: 1200,
          gap: 20,
          placeItems: 'start'
        }}
      >
        <Stack style={{ flex: 5 }}>
          <PostList userPosts={brand.userPosts} />
        </Stack>

        <Stack style={{ flex: 2 }}>
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
