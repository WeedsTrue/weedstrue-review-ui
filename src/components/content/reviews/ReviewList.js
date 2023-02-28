import React from 'react';
import { Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import ReviewListItem from './ReviewListItem';

const ReviewList = () => {
  return (
    <Stack sx={{ gap: 20 }}>
      <ReviewListItem />
      <ReviewListItem />
      <ReviewListItem />
      <ReviewListItem />
      <Stack>
        <Text color="dodgerblue" component={Link} sx={{ margin: 'auto' }}>
          Show more...
        </Text>
      </Stack>
    </Stack>
  );
};

ReviewList.propTypes = {};

export default ReviewList;
