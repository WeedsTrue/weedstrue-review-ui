import React, { useState } from 'react';
import { Button, Card, Group, Select } from '@mantine/core';
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

const PostListFilter = () => {
  const [formState, setFormState] = useState({
    sortAction: 'trending',
    sortBy: 'trending',
    fkUserPostType: null
  });

  return (
    <Card sx={{ overflow: 'visible' }}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Group sx={{ gap: 10 }}>
          {FILTER_BUTTONS.map(b => {
            const isSelected = formState.sortBy === b.value;
            return (
              <Button
                color={isSelected ? 'blue' : 'gray'}
                key={b.value}
                leftIcon={b.icon}
                onClick={() =>
                  setFormState({
                    ...formState,

                    sortAction: b.action,
                    sortBy: b.value
                  })
                }
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
          onChange={value =>
            setFormState({
              ...formState,
              fkUserPostType: value
            })
          }
          placeholder="Filter by post..."
          value={formState.fkUserPostType}
        />
      </Group>
    </Card>
  );
};

PostListFilter.postFilter = {};

export default PostListFilter;