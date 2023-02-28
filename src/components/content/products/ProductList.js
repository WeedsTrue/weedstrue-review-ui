import React from 'react';
import { Card, Grid, Stack, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

const ProductList = ({ products, isLoading }) => {
  return (
    <Stack sx={{ gap: 20 }}>
      <Card sx={{ textAlign: 'center' }}>
        <Title sx={{ margin: 'auto' }}>Products</Title>
      </Card>

      <Grid gutter="xl" sx={{}}>
        {products.map(p => (
          <Grid.Col
            key={p.pkProduct}
            lg={3}
            md={3}
            sm={4}
            to={`/products/${p.uuid}`}
            xl={3}
            xs={12}
          >
            <ProductListItem product={p} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

ProductList.propTypes = {
  isLoading: PropTypes.bool,
  products: PropTypes.array
};

export default ProductList;
