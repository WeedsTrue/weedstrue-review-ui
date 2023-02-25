import React, { useContext, useEffect, useRef } from 'react';
import { Card } from '@mantine/core';
import BrandList from './BrandList';
import { Provider as ReviewsProvider } from '../../../providers/ReviewsProvider';

const BrandListView = () => {
  const hasFetched = useRef(false);
  const { state, fetchBrands } = useContext(ReviewsProvider);

  useEffect(() => {
    fetchBrands();
    hasFetched.current = true;
  }, []);

  return (
    <Card>
      <BrandList
        brands={state.brands.value}
        isLoading={!hasFetched.current || state.brands.loading}
      />
    </Card>
  );
};

export default BrandListView;
