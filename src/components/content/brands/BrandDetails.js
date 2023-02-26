import React, { useContext, useEffect, useRef } from 'react';
import { Card, Rating, Skeleton, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const BrandDetails = () => {
  const hasFetched = useRef(false);
  const { state, fetchBrand } = useContext(ReviewsContext);

  const { uuid } = useParams();
  const { value: brand } = state.brand;

  useEffect(() => {
    if (uuid) {
      fetchBrand(uuid, () => {}, triggerNotification);
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Stack sx={{ gap: 40 }}>
      <Card sx={{ margin: '20px auto', width: '100%', maxWidth: 900 }}>
        <Stack sx={{ flex: 1, padding: 30, alignItems: 'center', gap: 10 }}>
          {!hasFetched.current || state.brand.value ? (
            <>
              <Title sx={{ textAlign: 'center' }}>{brand?.name}</Title>
              <Rating readOnly value={4}></Rating>
            </>
          ) : (
            <>
              <Skeleton height={44} width={'35%'} />
              <Skeleton height={18} width={100} />
            </>
          )}
        </Stack>
      </Card>
    </Stack>
  );
};

export default BrandDetails;
