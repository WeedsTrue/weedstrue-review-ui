import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListFilter from './ProductListFilter';
import ProductListItem from './ProductListItem';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProductList = ({ isLoading, searchOnRender }) => {
  const { state, fetchProducts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null,
    lastUserPost: null,
    totalCount: 0,
    isLoading: false
  });

  useEffect(() => {
    if (searchOnRender) {
      fetchProducts({});
    }
  }, [searchOnRender]);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    setFilterState(newState);
    fetchProducts({ ...newState }, totalCount =>
      setFilterState({
        ...newState,
        totalCount
      })
    );
  };

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
        ) : state.products.value.length === 0 ? (
          <Card sx={{ textAlign: 'center' }}>
            <Stack sx={{ padding: 60 }}>
              <Text weight={500}>No products available</Text>
            </Stack>
          </Card>
        ) : (
          <Grid gutter="xl" sx={{}}>
            {state.products.value.map(p => (
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
  isLoading: PropTypes.bool,
  searchOnRender: PropTypes.bool
};

export default ProductList;
