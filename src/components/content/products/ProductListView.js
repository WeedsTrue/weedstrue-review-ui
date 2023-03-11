import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stack } from '@mantine/core';
import ProductList from './ProductList';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProductListView = () => {
  const hasFetched = useRef(false);
  const { state, fetchProducts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkPostType: null
  });

  useEffect(() => {
    fetchProducts({});
    hasFetched.current = true;
  }, []);

  return (
    <Stack sx={{ margin: '20px auto', width: '100%', maxWidth: 1400, gap: 10 }}>
      <ProductList
        filterState={filterState}
        isLoading={!hasFetched.current || state.products.loading}
        onFilterChange={filter => {
          fetchProducts(filter);
        }}
        products={state.products.value}
      />
    </Stack>
  );
};

export default ProductListView;
