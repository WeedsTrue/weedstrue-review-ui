import React from 'react';
import { Button, Card, Group, Select } from '@mantine/core';
import PropTypes from 'prop-types';
import { ChartArrowsVertical, Flame, Star, Sun } from 'tabler-icons-react';
import { PRODUCT_TYPES } from '../../../config/constants';

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

const ProductListFilter = ({ onFilterChange, filterState }) => {
  return (
    <Card sx={{ overflow: 'visible' }}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Group sx={{ gap: 10 }}>
          {FILTER_BUTTONS.map(b => {
            const isSelected = filterState.sortBy === b.value;
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
          data={PRODUCT_TYPES.sort((a, b) => a.label.localeCompare(b.label))}
          onChange={value => onFilterChange('fkProductType', value)}
          placeholder="Filter by type..."
          value={filterState?.fkProductType}
        />
      </Group>
    </Card>
  );
};

ProductListFilter.propTypes = {
  filterState: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default ProductListFilter;
