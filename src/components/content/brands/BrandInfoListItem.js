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
  Tooltip
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AlertCircle, Leaf } from 'tabler-icons-react';
import { reactToItem } from '../../../helpers/reactionHelper';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ReportContentModal from '../reports/ReportContentModal';

const BrandInfoListItem = ({ brand, showReport }) => {
  const { state: authState, toggleAuthModal } = useContext(AuthContext);
  const { createBrandReaction } = useContext(ReviewsContext);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reactionState, setReactionState] = useState({
    value: 0,
    deleted: false
  });

  const isUpvoted =
    (brand?.userReaction?.isPositive && reactionState.value === 0) ||
    (reactionState.value > 0 && !reactionState.deleted);
  const isDownVoted =
    (brand?.userReaction &&
      !brand.userReaction.isPositive &&
      reactionState.value === 0) ||
    (reactionState.value < 0 && !reactionState.deleted);

  const createReaction = isPositive => {
    if (authState.isAuthenticated) {
      reactToItem(
        {
          isUpvoted,
          isDownVoted,
          fkBrand: brand.pkBrand,
          fkUserPostReaction: brand.userReaction?.pkUserReaction,
          isPositive,
          deleted: reactionState.deleted
        },
        brand?.userReaction,
        createBrandReaction,
        setReactionState
      );
    } else {
      toggleAuthModal(true);
    }
  };

  return brand ? (
    <Card
      component={Link}
      shadow="xl"
      sx={{ height: 350, display: 'flex' }}
      to={`/brands/${brand.uuid}`}
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
              onClick={() => {
                if (authState.isAuthenticated) {
                  setShowReportModal(true);
                } else {
                  toggleAuthModal(true);
                }
              }}
              sx={{ position: 'absolute', right: -10, top: -10 }}
              variant="outline"
            >
              <AlertCircle />
            </ActionIcon>
          </Tooltip>
        )}

        <Title order={4} sx={{ textAlign: 'center' }}>
          {brand.name}
        </Title>
        <Rating fractions={2} readOnly value={brand.rating}></Rating>
        <Stack sx={{ flex: 1 }}></Stack>
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
              {brand.positiveReactionCount -
                brand.negativeReactionCount +
                (!brand?.userReaction && reactionState.deleted
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
      <ReportContentModal
        contentType="brand"
        onClose={() => setShowReportModal(false)}
        onReport={() => {}}
        opened={showReportModal}
        pkContent={brand.pkBrand}
      />
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
  brand: PropTypes.object,
  showReport: PropTypes.bool
};

export default BrandInfoListItem;
