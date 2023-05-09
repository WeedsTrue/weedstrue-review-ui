import React from 'react';
import { Stack } from '@mantine/core';
import ProductList from './ProductList';
import { mq } from '../../../config/theme';

const ProductListView = () => {
  return (
    <Stack
      sx={mq({
        margin: [0, '10px 0px', '15px auto'],
        flex: 1,
        width: '100%',
        maxWidth: 1400,
        gap: 10
      })}
    >
      <ProductList searchOnRender />
    </Stack>
  );
};

export default ProductListView;
