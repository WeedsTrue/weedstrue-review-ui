import React from 'react';
import { Card, Grid, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListFilter from './ProductListFilter';
import ProductListItem from './ProductListItem';

const ProductList = ({ products, isLoading, onFilterChange, filterState }) => {
  return (
    <Stack sx={{ gap: 10 }}>
      <Card sx={{ textAlign: 'center' }}>
        <Title sx={{ margin: 'auto' }}>Products</Title>
      </Card>

      <ProductListFilter
        filterState={filterState}
        onFilterChange={onFilterChange}
      />
      <Stack sx={{ gap: 20 }}>
        {isLoading ? (
          <Grid gutter="xl" sx={{}}>
            <Grid.Col lg={3} md={3} sm={4} xl={3} xs={12}>
              <ProductListItem />
            </Grid.Col>
            <Grid.Col lg={3} md={3} sm={4} xl={3} xs={12}>
              <ProductListItem />
            </Grid.Col>
            <Grid.Col lg={3} md={3} sm={4} xl={3} xs={12}>
              <ProductListItem />
            </Grid.Col>
            <Grid.Col lg={3} md={3} sm={4} xl={3} xs={12}>
              <ProductListItem />
            </Grid.Col>
          </Grid>
        ) : products.length === 0 ? (
          <Card sx={{ textAlign: 'center' }}>
            <Stack sx={{ padding: 60 }}>
              <Text weight={500}>No products available</Text>
            </Stack>
          </Card>
        ) : (
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
        )}
      </Stack>
    </Stack>
  );
};

ProductList.propTypes = {
  filterState: PropTypes.object,
  isLoading: PropTypes.bool,
  products: PropTypes.array,
  onFilterChange: PropTypes.func
};

export default ProductList;
