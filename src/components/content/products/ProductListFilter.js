import React, { useContext, useEffect, useState } from 'react';
import { ActionIcon, Button, Card, Group, Select, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import {
  ChartArrowsVertical,
  ChevronDown,
  ChevronUp,
  Flame,
  Star,
  Sun
} from 'tabler-icons-react';
import { PRODUCT_TYPES } from '../../../config/constants';
import { mq } from '../../../config/theme';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

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
  const { state, fetchProductFilters } = useContext(ReviewsContext);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const productTypeOptions =
    state.productFilters.value?.productTypes
      ?.map(p => ({
        label: p.value,
        value: p.pkProductType.toString()
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  useEffect(() => {
    fetchProductFilters();
  }, []);

  return (
    <Card
      sx={mq({
        overflow: 'visible',
        padding: ['10px !important', '15px !important', '20px !important']
      })}
    >
      <Stack sx={{ gap: 10 }}>
        <Group noWrap sx={{ justifyContent: 'space-between', gap: 5 }}>
          <Group
            noWrap
            sx={mq({ gap: [0, 10], flex: 1, display: ['none', 'flex'] })}
          >
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

          <Stack sx={mq({ display: ['flex', 'none'] })}>
            <Select
              data={FILTER_BUTTONS.map(b => ({
                label: b.label,
                value: b.value
              }))}
              onChange={value => onFilterChange('sortBy', value)}
              value={filterState?.sortBy}
            />
          </Stack>

          <Stack sx={mq({ display: ['none', 'none', 'none', 'flex'] })}>
            <Select
              clearable
              data={productTypeOptions}
              onChange={value => onFilterChange('fkProductType', value)}
              placeholder="Filter by type..."
              value={filterState?.fkProductType}
            />
          </Stack>

          <Stack sx={mq({ display: ['flex', 'flex', 'flex', 'none'] })}>
            <ActionIcon
              color="dark"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
            >
              {showMobileFilter ? <ChevronUp /> : <ChevronDown />}
            </ActionIcon>
          </Stack>
        </Group>
        {showMobileFilter && (
          <Stack
            sx={mq({
              display: ['flex', 'flex', 'flex', 'none'],
              maxWidth: ['unset', 300]
            })}
          >
            <Select
              clearable
              data={PRODUCT_TYPES.sort((a, b) =>
                a.label.localeCompare(b.label)
              )}
              onChange={value => onFilterChange('fkProductType', value)}
              placeholder="Filter by type..."
              value={filterState?.fkProductType}
            />
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

ProductListFilter.propTypes = {
  filterState: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default ProductListFilter;
