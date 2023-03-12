import React, { useContext, useState } from 'react';
import {
  ActionIcon,
  Card,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Leaf } from 'tabler-icons-react';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const BrandInfoListItem = ({ brand }) => {
  const { createBrandReaction } = useContext(ReviewsContext);
  const [reactionState, setReactionState] = useState(0);

  return brand ? (
    <Card
      component={Link}
      shadow="xl"
      sx={{ height: 350, display: 'flex' }}
      to={`/brands/${brand.uuid}`}
    >
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Title order={4} sx={{ textAlign: 'center' }}>
          {brand.name}
        </Title>
        <Rating fractions={2} readOnly value={brand.rating}></Rating>
        <Stack sx={{ flex: 1 }}></Stack>
        <Group>
          <Group sx={{ gap: 5, marginRight: 5 }}>
            <ActionIcon
              color={reactionState === 1 ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                setReactionState(1);
                createBrandReaction(
                  {
                    fkBrand: brand.pkBrand,
                    isPositive: true
                  },
                  () => {},
                  () => {
                    setReactionState(0);
                  }
                );
              }}
              size={24}
              variant="transparent"
            >
              <Leaf />
            </ActionIcon>
            <Text size={14} weight={500}>
              {brand.positiveReactionCount -
                brand.negativeReactionCount +
                reactionState}
            </Text>
            <ActionIcon
              color={reactionState === -1 ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                setReactionState(-1);
                createBrandReaction(
                  {
                    fkBrand: brand.pkBrand,
                    isPositive: false
                  },
                  () => {},
                  () => {
                    setReactionState(0);
                  }
                );
              }}
              size={24}
              variant="transparent"
            >
              <Leaf
                style={{
                  transform: 'rotate(180deg)',
                  MozTransform: 'rotate(180deg)',
                  WebkitTransform: 'rotate(180deg)',
                  msTransform: 'rotate(180deg)'
                }}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </Card>
  ) : (
    <Card shadow="xl" sx={{ height: 350 }}>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 15 }}>
        <Skeleton height={18} width={200} />
        <Skeleton height={18} width={100} />
      </Stack>
    </Card>
  );
};

BrandInfoListItem.propTypes = {
  brand: PropTypes.object
};

export default BrandInfoListItem;
