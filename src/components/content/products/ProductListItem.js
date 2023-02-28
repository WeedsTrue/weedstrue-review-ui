import React from 'react';
import { Card, Rating, Stack, Tabs, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  return product ? (
    <Card
      component={Link}
      shadow="xl"
      sx={{ height: 350 }}
      to={`/products/${product.uuid}`}
    >
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Text
          component={Link}
          sx={{
            fontSize: 14,
            lineHeight: '14px',
            color: 'dodgerblue',
            '&:hover': { fontWeight: 500 }
          }}
          to={`/brands/${product.brand.uuid}`}
        >
          {product.brand.name}
        </Text>
        <Title order={4} sx={{ textAlign: 'center' }}>
          {product.name}
        </Title>
        <Rating readOnly value={Math.floor(Math.random() * 5) + 1}></Rating>
      </Stack>
    </Card>
  ) : (
    <></>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.object
};

export default ProductListItem;
