import React, { useContext, useEffect, useRef } from 'react';
import { Card } from '@mantine/core';
import BrandList from './BrandList';
import { mq } from '../../../config/theme';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const BrandListView = () => {
  const hasFetched = useRef(false);
  const { state, fetchBrands } = useContext(ReviewsContext);

  useEffect(() => {
    fetchBrands();
    hasFetched.current = true;
  }, []);

  return (
    <Card
      sx={mq({ margin: [0, 0, '20px auto'], width: '100%', maxWidth: 900 })}
    >
      <BrandList
        brands={state.brands.value}
        isLoading={!hasFetched.current || state.brands.loading}
      />
    </Card>
  );
};

export default BrandListView;
