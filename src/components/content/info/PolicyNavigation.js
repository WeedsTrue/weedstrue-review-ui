import React, { useState } from 'react';
import { ActionIcon, Divider, Group, Stack, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, ChevronUp } from 'tabler-icons-react';
import { mq } from '../../../config/theme';

const POLICIES = [
  {
    label: 'Privacy Policy',
    value: 'privacy-policy'
  },
  {
    label: 'Terms of Use',
    value: 'terms-of-use'
  },
  {
    label: 'Accessibility Policy',
    value: 'accessibility-policy'
  },
  {
    label: 'Cookie Policy',
    value: 'cookie-policy'
  },
  {
    label: 'Copyright Notice',
    value: 'copyright-notice'
  },
  {
    label: 'Anti-Spam Policy',
    value: 'anti-spam-policy'
  },
  {
    label: 'Community Guidelines',
    value: 'community-guidelines'
  },
  {
    label: 'Disclaimer',
    value: 'disclaimer'
  }
];

const PolicyNavigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { pathname } = useLocation();
  const policy = pathname.split('/')[2];

  return (
    <Stack sx={mq({ gap: [0, 0, 10] })}>
      <Stack sx={mq({ padding: ['15px 10px', '15px 10px', 0] })}>
        <Group
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          sx={{ justifyContent: 'space-between' }}
        >
          <Text size={20} sx={{ lineHeight: '16px' }} weight={500}>
            WeedsTrue Policies
          </Text>
          <ActionIcon
            color="dark"
            size={24}
            sx={mq({ display: ['flex', 'flex', 'none'] })}
          >
            {showMobileMenu ? <ChevronUp /> : <ChevronDown />}
          </ActionIcon>
        </Group>
      </Stack>

      <Divider />
      <Stack
        sx={mq({
          gap: [0, 0, 10],
          display: showMobileMenu ? 'flex' : ['none', 'none', 'flex']
        })}
      >
        <Stack
          sx={mq({
            display: showMobileMenu ? 'flex' : ['none', 'none', 'flex'],
            flex: 1,
            gap: 5,
            padding: [10, 10, 0],
            marginTop: [5, 5, 0]
          })}
        >
          {POLICIES.map(p => (
            <Group
              component={Link}
              key={p.value}
              onClick={() => setShowMobileMenu(false)}
              sx={{
                textDecoration: 'none',
                color: 'black',
                padding: 5,
                border:
                  policy === p.value
                    ? 'solid 1px dodgerblue'
                    : 'solid 1px lightgrey',
                justifyContent: 'space-between',
                cursor: 'pointer',
                '&:hover': {
                  border: 'solid 1px dodgerblue',
                  padding: 5
                }
              }}
              to={`/info/${p.value}`}
            >
              <Text weight={500}>{p.label}</Text>
              <ChevronRight color="lightgrey" />
            </Group>
          ))}
        </Stack>
        <Divider
          sx={mq({
            marginTop: 5,
            display: ['flex', 'flex', 'none'],
            alignSelf: 'stretch'
          })}
        />
      </Stack>
    </Stack>
  );
};

export default PolicyNavigation;
