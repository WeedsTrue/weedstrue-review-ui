import React from 'react';
import { Stack } from '@mantine/core';
import ProductList from './ProductList';

const ProductListView = () => {
  return (
    <Stack sx={{ margin: '20px auto', width: '100%', maxWidth: 1400, gap: 10 }}>
      <ProductList searchOnRender />
    </Stack>
  );
};

export default ProductListView;
