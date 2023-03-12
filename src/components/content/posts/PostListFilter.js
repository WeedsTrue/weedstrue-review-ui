import React, { useState } from 'react';
import { Button, Card, Group, Select } from '@mantine/core';
import PropTypes from 'prop-types';
import { ChartArrowsVertical, Flame, Star, Sun } from 'tabler-icons-react';

const FILTER_BUTTONS = [
  {
    label: 'Trending',
    action: 'trending',
    icon: <Flame />,
    value: 'trending'
  },
  {
    label: 'New',
    action: 'new',
    icon: <Sun />,
    value: 'new'
  },
  {
    label: 'Top',
    action: 'top',
    icon: <ChartArrowsVertical />,
    value: 'top'
  },
  {
    label: 'Rating',
    action: 'rating',
    icon: <Star />,
    value: 'rating'
  }
];

const POST_TYPES = [
  {
    value: 1,
    label: 'Reviews'
  },
  {
    value: 2,
    label: 'News'
  },
  {
    value: 3,
    label: 'Questions'
  },
  {
    value: 4,
    label: 'Discussion'
  },
  {
    value: 5,
    label: 'Images'
  }
];

const PostListFilter = ({ onFilterChange, filterState }) => {
  return (
    <Card sx={{ overflow: 'visible' }}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Group sx={{ gap: 10 }}>
          {FILTER_BUTTONS.map(b => {
            const isSelected = filterState?.sortBy === b.value;
            return (
              <Button
                color={isSelected ? 'blue' : 'gray'}
                key={b.value}
                leftIcon={b.icon}
                onClick={() => onFilterChange('sortBy', b.value)}
                radius="xl"
                styles={{ leftIcon: { marginRight: 10 } }}
                variant={isSelected ? 'light' : 'subtle'}
              >
                {b.label}
              </Button>
            );
          })}
        </Group>
        <Select
          clearable
          data={POST_TYPES}
          onChange={value => onFilterChange('fkUserPostType', value)}
          placeholder="Filter by post..."
          value={filterState?.fkUserPostType}
        />
      </Group>
    </Card>
  );
};

PostListFilter.propTypes = {
  filterState: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default PostListFilter;
