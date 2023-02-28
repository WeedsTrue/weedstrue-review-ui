import React from 'react';
import { Rating, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';

const ReviewListItem = ({ review }) => {
  return (
    <Stack
      sx={{
        border: 'solid 1px lightgrey',
        padding: 10,
        gap: 0,
        overflow: 'hidden'
      }}
    >
      <Text sx={{ fontSize: 16 }} weight={500}>
        Lorem ipsum dolor sit amet!
      </Text>
      <Rating readOnly value={4} />
      <Text
        sx={{
          fontSize: 14,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box'
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </Stack>
  );
};

ReviewListItem.propTypes = {
  review: PropTypes.object
};

export default ReviewListItem;
