import React from 'react';
import {
  Card,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title,
  UnstyledButton
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  const navigate = useNavigate();
  return product ? (
    <Card
      component={Link}
      shadow="xl"
      sx={{ height: 350 }}
      to={`/products/${product.uuid}`}
    >
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
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
        <Rating readOnly value={Math.floor(Math.random() * 5) + 1}></Rating>
      </Stack>
    </Card>
  ) : (
    <Card shadow="xl" sx={{ height: 350 }}>
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
