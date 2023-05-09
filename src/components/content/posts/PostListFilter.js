import React, { useState } from 'react';
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
import { mq } from '../../../config/theme';

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
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  return (
    <Card
      sx={mq({
        overflow: 'visible',
        padding: ['10px !important', '15px !important', '20px !important']
      })}
    >
      <Stack sx={mq({ gap: 10 })}>
        <Group noWrap sx={{ justifyContent: 'space-between', gap: 5 }}>
          <Group
            noWrap
            sx={mq({ gap: [0, 10], flex: 1, display: ['none', 'flex'] })}
          >
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
          <Stack sx={mq({ display: ['flex', 'none'], flex: 1 })}>
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
              data={POST_TYPES}
              onChange={value => onFilterChange('fkUserPostType', value)}
              placeholder="Filter by post..."
              value={filterState?.fkUserPostType}
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
              data={POST_TYPES}
              onChange={value => onFilterChange('fkUserPostType', value)}
              placeholder="Filter by post..."
              value={filterState?.fkUserPostType}
            />
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

PostListFilter.propTypes = {
  filterState: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default PostListFilter;
