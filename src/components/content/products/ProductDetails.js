import React, { useState } from 'react';
import {
  ActionIcon,
  Card,
  Divider,
  Group,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
import ProductSidebarInfo from './ProductSidebarInfo';
import { mq } from '../../../config/theme';
import PostList from '../posts/PostList';

const ProductDetails = ({ product, isLoading }) => {
  const [showMobilePostSidebarInfo, setShowMobilePostSidebarInfo] =
    useState(false);

  return !isLoading && product ? (
    <Stack sx={mq({ gap: [5, 10, 20] })}>
      <Card>
        <Stack sx={{ flex: 1, padding: 20, alignItems: 'center', gap: 10 }}>
          <Title sx={{ textAlign: 'center' }}>{product.name}</Title>
          <Rating fractions={2} readOnly value={product.rating}></Rating>
        </Stack>
      </Card>
      <Group
        noWrap
        sx={mq({
          gap: [5, 10, 20],
          placeItems: 'start',
          flexDirection: ['column', 'column', 'row-reverse'],
          justifyContent: 'center'
        })}
      >
        <Stack
          sx={mq({
            gap: 0,
            flex: 1,
            maxWidth: ['unset', 'unset', 332],
            alignSelf: 'stretch'
          })}
        >
          <Stack
            sx={mq({
              display: ['flex', 'flex', 'none'],
              gap: 0,
              flex: 1,
              alignSelf: 'stretch'
            })}
          >
            <Card
              sx={mq({
                padding: [
                  '10px !important',
                  '10px !important',
                  '20px !important'
                ]
              })}
            >
              <Group noWrap sx={{ justifyContent: 'space-between' }}>
                <Text weight={500}>Product Information</Text>
                <ActionIcon
                  color="dark"
                  onClick={() =>
                    setShowMobilePostSidebarInfo(!showMobilePostSidebarInfo)
                  }
                >
                  {showMobilePostSidebarInfo ? <ChevronUp /> : <ChevronDown />}
                </ActionIcon>
              </Group>
            </Card>
            <Divider />
          </Stack>

          <Stack
            sx={mq({
              display: showMobilePostSidebarInfo
                ? 'flex'
                : ['none', 'none', 'flex'],
              flex: 1,
              maxWidth: ['unset', 'unset', 332],
              gap: [0, 0, 20]
            })}
          >
            <ProductSidebarInfo product={product} showReport />
          </Stack>
        </Stack>

        <Stack
          sx={mq({
            flex: 1,
            maxWidth: ['unset', 'unset', 768],
            alignSelf: 'stretch'
          })}
        >
          <PostList fkProduct={product.pkProduct} searchOnRender />
        </Stack>
      </Group>
    </Stack>
  ) : (
    <Stack sx={mq({ gap: [5, 10, 20] })}>
      <Card>
        <Stack sx={{ flex: 1, padding: 20, alignItems: 'center', gap: 10 }}>
          <Skeleton height={45} sx={mq({ width: ['75%', '50%', '25%'] })} />
          <Skeleton height={20} width={100} />
        </Stack>
      </Card>
      <Group
        noWrap
        sx={mq({
          gap: [5, 10, 20],
          placeItems: 'start',
          flexDirection: ['column', 'column', 'row-reverse'],
          justifyContent: 'center'
        })}
      >
        <Stack
          sx={mq({
            gap: 0,
            flex: 1,
            maxWidth: ['unset', 'unset', 332],
            alignSelf: 'stretch'
          })}
        >
          <Stack
            sx={mq({
              display: ['flex', 'flex', 'none'],
              gap: 0,
              flex: 1,
              alignSelf: 'stretch'
            })}
          >
            <Card
              sx={mq({
                padding: [
                  '10px !important',
                  '10px !important',
                  '20px !important'
                ]
              })}
            >
              <Group sx={{ justifyContent: 'space-between' }}>
                <Text weight={500}>Product Information</Text>
                <ActionIcon
                  color="dark"
                  onClick={() =>
                    setShowMobilePostSidebarInfo(!showMobilePostSidebarInfo)
                  }
                >
                  {showMobilePostSidebarInfo ? <ChevronUp /> : <ChevronDown />}
                </ActionIcon>
              </Group>
            </Card>
            <Divider />
          </Stack>

          <Stack
            sx={mq({
              display: showMobilePostSidebarInfo
                ? 'flex'
                : ['none', 'none', 'flex'],
              flex: 1,
              maxWidth: ['unset', 'unset', 332],
              gap: [0, 0, 20]
            })}
          >
            <ProductSidebarInfo isLoading />
          </Stack>
        </Stack>

        <Stack
          sx={mq({
            flex: 1,
            maxWidth: ['unset', 'unset', 768],
            alignSelf: 'stretch'
          })}
        >
          <PostList isLoading />
        </Stack>
      </Group>
    </Stack>
  );
};

ProductDetails.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

export default ProductDetails;
