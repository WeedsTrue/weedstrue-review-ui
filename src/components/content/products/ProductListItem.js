import React, { useContext, useState } from 'react';
import {
  ActionIcon,
  Card,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title,
  UnstyledButton
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'tabler-icons-react';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProductListItem = ({ product }) => {
  const { createProductReaction } = useContext(ReviewsContext);
  const [reactionState, setReactionState] = useState(0);

  const navigate = useNavigate();
  return product ? (
    <Card
      component={Link}
      shadow="xl"
      sx={{ height: 350, display: 'flex' }}
      to={`/products/${product.uuid}`}
    >
      <Stack
        sx={{
          flex: 1,
          padding: 10,
          alignItems: 'center',
          gap: 10
        }}
      >
        <UnstyledButton
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/brands/${product.brand.uuid}`);
          }}
        >
          <Text
            sx={{
              fontSize: 14,
              lineHeight: '14px',
              color: 'dodgerblue',
              '&:hover': { fontWeight: 500 }
            }}
          >
            {product.brand.name}
          </Text>
        </UnstyledButton>

        <Title order={4} sx={{ textAlign: 'center' }}>
          {product.name}
        </Title>
        <Rating fractions={2} readOnly value={product.rating}></Rating>
        <Stack sx={{ flex: 1 }}></Stack>
        <Group>
          <Group sx={{ gap: 5, marginRight: 5 }}>
            <ActionIcon
              color={reactionState === 1 ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                setReactionState(1);
                createProductReaction(
                  {
                    fkProduct: product.pkProduct,
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
              {product.positiveReactionCount -
                product.negativeReactionCount +
                reactionState}
            </Text>
            <ActionIcon
              color={reactionState === -1 ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                setReactionState(-1);
                createProductReaction(
                  {
                    fkProduct: product.pkProduct,
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
    <Card shadow="xl" sx={{ height: 350, display: 'flex' }}>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 15 }}>
        <Skeleton height={14} width={100} />
        <Skeleton height={18} width={200} />
        <Skeleton height={18} width={100} />
      </Stack>
    </Card>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.object
};

export default ProductListItem;
