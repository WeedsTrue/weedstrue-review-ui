import React from 'react';
import {
  Card,
  Divider,
  Group,
  NavLink,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { ChevronRight } from 'tabler-icons-react';
import BrandInfoListItem from './BrandInfoListItem';
import { LINK_SOURCE_TYPE } from '../../../config/constants';
import { mq } from '../../../config/theme';

const BrandSidebarInfo = ({ brand }) => {
  return (
    <>
      <BrandInfoListItem brand={brand} showReport />
      <Divider sx={mq({ display: ['flex', 'flex', 'none'] })} />
      {brand && (
        <>
          <Card style={{ padding: 0 }}>
            <Group sx={mq({ padding: ['10px 15px', 15, 20] })}>
              <Title order={4} sx={{ lineHeight: '20px' }}>
                Links
              </Title>
            </Group>
            <Divider sx={mq({ display: ['none', 'none', 'flex'] })} />
            <Stack
              sx={mq({
                padding: ['10px 15px', 15, 20],
                gap: 10,
                paddingTop: [0, 0, 20]
              })}
            >
              {brand.links.map(link => (
                <NavLink
                  component="a"
                  href={link.value}
                  key={link.fkLinkSourceType}
                  label={
                    <Text weight={500}>
                      {LINK_SOURCE_TYPE[link.fkLinkSourceType - 1]?.label}
                    </Text>
                  }
                  rightSection={<ChevronRight />}
                  sx={{ border: 'solid 1px lightgrey' }}
                  target="_blank"
                  variant="subtle"
                />
              ))}
              <NavLink
                component="a"
                href={`https://www.reddit.com/r/TheOCS/search/?q=${encodeURIComponent(
                  `${brand.name}`
                )}`}
                label={<Text weight={500}>Reddit</Text>}
                rightSection={<ChevronRight />}
                sx={{ border: 'solid 1px lightgrey' }}
                target="_blank"
                variant="subtle"
              />
            </Stack>
          </Card>
          <Divider sx={mq({ display: ['flex', 'flex', 'none'] })} />
        </>
      )}
    </>
  );
};

BrandSidebarInfo.propTypes = {
  brand: PropTypes.object,
  isLoading: PropTypes.bool
};

export default BrandSidebarInfo;
