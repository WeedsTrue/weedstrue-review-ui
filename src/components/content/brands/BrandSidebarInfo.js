import React from 'react';
import { Card, Rating, Stack, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BrandSidebarInfo = ({ brand, isLoading }) => {
  return !isLoading && brand ? (
    <>
      <Card
        component={Link}
        shadow="xl"
        sx={{ height: 350 }}
        to={`/brands/${brand.uuid}`}
      >
        <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
          <Title order={4} sx={{ textAlign: 'center' }}>
            {brand.name}
          </Title>
          <Rating readOnly value={Math.floor(Math.random() * 5) + 1}></Rating>
        </Stack>
      </Card>
    </>
  ) : (
    <></>
  );
};

BrandSidebarInfo.propTypes = {
  brand: PropTypes.object,
  isLoading: PropTypes.bool
};

export default BrandSidebarInfo;
