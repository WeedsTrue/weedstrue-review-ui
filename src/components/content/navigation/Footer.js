import React, { useContext } from 'react';
import {
  Anchor,
  Group,
  Footer as MantineFooter,
  Stack,
  Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';

const Footer = () => {
  const { state, toggleAuthModal } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <MantineFooter
      fixed={false}
      height={[600, 600, 200]}
      sx={{ flex: 1, position: 'relative', padding: 5 }}
    >
      <Group
        sx={mq({
          flex: 1,
          padding: [20, 20, '20px 40px'],
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: 20,
          flexDirection: ['column', 'row', 'row']
        })}
      >
        <Group
          sx={mq({
            gap: [20, 40, 60],
            alignItems: 'start',
            flexDirection: ['column', 'row', 'row']
          })}
        >
          <Stack sx={{ gap: 10 }}>
            <Text weight={500}>Account</Text>
            {state.isAuthenticated ? (
              <>
                <Anchor
                  color="grey"
                  onClick={() =>
                    navigate(`/profile/${state.userData.username}`)
                  }
                >
                  My Profile
                </Anchor>
                <Anchor color="grey" onClick={() => navigate('/settings')}>
                  Settings
                </Anchor>
              </>
            ) : (
              <>
                <Anchor color="grey" onClick={() => toggleAuthModal(true)}>
                  Login
                </Anchor>
                <Anchor
                  color="grey"
                  onClick={() => toggleAuthModal(true, 'register')}
                >
                  Sign Up
                </Anchor>
              </>
            )}
          </Stack>
          <Stack sx={{ gap: 10 }}>
            <Text weight={500}>Navigation</Text>
            <Anchor color="grey" onClick={() => navigate('/')}>
              Community
            </Anchor>
            <Anchor color="grey" onClick={() => navigate('/brands')}>
              Brands
            </Anchor>
            <Anchor color="grey" onClick={() => navigate('/products')}>
              Products
            </Anchor>
          </Stack>
          <Stack sx={{ gap: 10 }}>
            <Text weight={500}>Legal</Text>
            <Anchor
              color="grey"
              onClick={() => navigate('/info/privacy-policy')}
            >
              Privacy Policy
            </Anchor>
            <Anchor color="grey" onClick={() => navigate('/info/terms-of-use')}>
              Terms of Use
            </Anchor>
            <Anchor
              color="grey"
              onClick={() => navigate('/info/community-guidelines')}
            >
              Community Guidelines
            </Anchor>
          </Stack>
        </Group>
        <Group>
          <Stack sx={{ gap: 10 }}>
            <Text weight={500}>Contact Us</Text>
            <Anchor
              color="grey"
              href="mailto:weedstrue@outlook.com"
              target="_blank"
            >
              weedstrue@outlook.com
            </Anchor>
          </Stack>
        </Group>
      </Group>
    </MantineFooter>
  );
};

Footer.propTypes = {};

export default Footer;
