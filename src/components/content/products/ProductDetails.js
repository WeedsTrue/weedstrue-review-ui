import React, { useContext, useEffect, useRef } from 'react';
import { Card, Rating, Skeleton, Stack, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ReviewList from '../reviews/ReviewList';

const ProductDetails = () => {
  const hasFetched = useRef(false);
  const { state, fetchProduct } = useContext(ReviewsContext);
  const { uuid } = useParams();
  const isLoading = !hasFetched.current || state.product.loading;

  useEffect(() => {
    if (uuid) {
      fetchProduct(uuid, () => {}, triggerNotification);
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Stack sx={{ gap: 40 }}>
      <Card sx={{ margin: '20px auto', width: '100%', maxWidth: 900 }}>
        <Stack sx={{ flex: 1, padding: 30, alignItems: 'center', gap: 10 }}>
          {!isLoading && state.product.value ? (
            <>
              <Title sx={{ textAlign: 'center' }}>
                {state.product.value.name}
              </Title>
              <Rating readOnly value={4}></Rating>
            </>
          ) : (
            <>
              <Skeleton height={44} width={'35%'} />
              <Skeleton height={18} width={100} />
            </>
          )}
        </Stack>
        <Stack sx={{ gap: 20 }}>
          <Text weight={500}>Reviews</Text>
          <ReviewList />
        </Stack>
      </Card>
    </Stack>
  );
};

export default ProductDetails;
