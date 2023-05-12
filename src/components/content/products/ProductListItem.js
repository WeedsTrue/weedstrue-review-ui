import React, { useContext, useState } from 'react';
import {
  ActionIcon,
  Card,
  Group,
  Image,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Leaf } from 'tabler-icons-react';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ReportContentModal from '../reports/ReportContentModal';

const ProductListItem = ({ product, showReport }) => {
  const { createProductReaction } = useContext(ReviewsContext);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reactionState, setReactionState] = useState({
    value: 0,
    deleted: false
  });

  const isUpvoted =
    (product?.userReaction?.isPositive && reactionState.value === 0) ||
    (reactionState.value > 0 && !reactionState.deleted);
  const isDownVoted =
    (product?.userReaction &&
      !product.userReaction.isPositive &&
      reactionState.value === 0) ||
    (reactionState.value < 0 && !reactionState.deleted);

  const createReaction = isPositive => {
    reactToItem(
      {
        isUpvoted,
        isDownVoted,
        fkProduct: product.pkProduct,
        isPositive,
        deleted: reactionState.deleted
      },
      product?.userReaction,
      createProductReaction,
      setReactionState
    );
  };

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
          gap: 10,
          position: 'relative'
        }}
      >
        {showReport && (
          <Tooltip label="Report">
            <ActionIcon
              color="red"
              onClick={() => setShowReportModal(true)}
              sx={{ position: 'absolute', right: -10, top: -10 }}
              variant="outline"
            >
              <AlertCircle />
            </ActionIcon>
          </Tooltip>
        )}
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
        <Stack sx={{ flex: 1 }}>
          {product.images.length > 0 && (
            <Image fit="contain" height={150} src={product.images[0].src} />
          )}
        </Stack>
        <Group>
          <Group sx={{ gap: 5, marginRight: 5 }}>
            <ActionIcon
              color={isUpvoted ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                createReaction(true);
              }}
              size={24}
              variant="transparent"
            >
              <Leaf />
            </ActionIcon>
            <Text size={14} weight={500}>
              {product.positiveReactionCount -
                product.negativeReactionCount +
                (!product?.userReaction && reactionState.deleted
                  ? 0
                  : reactionState.value)}
            </Text>
            <ActionIcon
              color={isDownVoted ? 'blue' : 'dark'}
              onClick={e => {
                e.preventDefault();
                createReaction(false);
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
      {showReport && (
        <ReportContentModal
          contentType="product"
          onClose={() => setShowReportModal(false)}
          onReport={() => {}}
          opened={showReportModal}
          pkContent={product.pkProduct}
        />
      )}
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
  product: PropTypes.object,
  showReport: PropTypes.bool
};

export default ProductListItem;
