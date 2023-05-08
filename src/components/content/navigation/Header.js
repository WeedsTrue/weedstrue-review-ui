import React, { useContext, useState } from 'react';
import {
  Header as MantineHeader,
  Avatar,
  Text,
  Group,
  Menu,
  Button,
  Stack,
  Drawer,
  Burger,
  Divider,
  NavLink,
  UnstyledButton
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Leaf, Logout, User } from 'tabler-icons-react';
import { links } from './links';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';

const Header = () => {
  const navigate = useNavigate();
  const { state, logout, toggleAuthModal } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <MantineHeader
      fixed
      height={60}
      sx={{ flex: 1, display: 'flex', padding: 5 }}
    >
      <Group sx={{ flex: 1, flexWrap: 'nowrap' }}>
        <Group
          sx={{
            gap: 20,
            flex: 1,
            flexWrap: 'nowrap'
          }}
        >
          <Group sx={{ flex: 1 }}>
            <Link
              style={{
                textDecoration: 'none',
                color: 'black'
              }}
              to="/lanes"
            >
              <Group
                sx={{
                  gap: 1,
                  flexWrap: 'nowrap'
                }}
              >
                <Leaf color="dodgerblue" size={40} />
                <Text sx={mq({ fontSize: 20 })} weight={700}>
                  WeedsTrue
                </Text>
              </Group>
            </Link>
          </Group>
          <Group
            sx={mq({
              flex: 3,
              gap: 50,
              display: ['none', 'none', 'none', 'flex']
            })}
          >
            {links.public.map(link => (
              <Stack key={link.to} sx={{ width: 125 }}>
                <Text
                  component={Link}
                  sx={{
                    margin: 'auto',
                    padding: '5px 10px',
                    fontSize: 18,
                    lineHeight: '18px',
                    fontWeight: link.isSelected(pathname) ? 700 : 500,
                    borderBottom: link.isSelected(pathname)
                      ? 'solid 2px black'
                      : 'none',
                    '&:hover': {
                      fontWeight: 700,
                      borderBottom: 'solid 2px black'
                    }
                  }}
                  to={link.to}
                >
                  {link.label}
                </Text>
              </Stack>
            ))}
          </Group>
        </Group>
        <Group
          sx={mq({ marginRight: 5, display: ['none', 'none', 'none', 'flex'] })}
        >
          {state.isAuthenticated ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  rightIcon={<ChevronDown />}
                  sx={mq({})}
                  variant="outline"
                >
                  <Group sx={{ gap: 10 }}>
                    <Avatar
                      color="blue"
                      radius={100}
                      size={29}
                      src={state.userData.avatar}
                    >
                      <Text>{state.userData.username[0].toUpperCase()}</Text>
                    </Avatar>
                    <Text>My Account</Text>
                  </Group>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<User />}
                  onClick={() => navigate(`profile/${state.userData.username}`)}
                >
                  My Profile
                </Menu.Item>
                <Menu.Divider />
                {links.public.map(link => (
                  <Menu.Item
                    icon={link.icon}
                    key={link.to}
                    onClick={() => navigate(link.to)}
                  >
                    {link.label}
                  </Menu.Item>
                ))}

                <Menu.Divider />
                <Menu.Item icon={<Logout size={20} />} onClick={() => logout()}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              onClick={() => toggleAuthModal(true)}
              sx={mq({ width: ['unset', 'unset', 125] })}
              variant="filled"
            >
              Log In
            </Button>
          )}
        </Group>
        <Group
          sx={mq({ marginRight: 5, display: ['flex', 'flex', 'flex', 'none'] })}
        >
          <Drawer
            onClose={() => setMobileDrawerOpen(false)}
            opened={mobileDrawerOpen}
            position="right"
            size={'100%'}
            styles={{
              content: mq({
                maxWidth: ['100%', '320px !important']
              }),
              body: {
                padding: 0,
                height: '100%'
              }
            }}
            withCloseButton={false}
          >
            <Stack sx={{ gap: 0, height: '100%' }}>
              {state.isAuthenticated ? (
                <>
                  <Stack sx={{ padding: 20 }}>
                    <UnstyledButton
                      component={Link}
                      onClick={() => setMobileDrawerOpen(false)}
                      to={`profile/${state.userData.username}`}
                    >
                      <Group>
                        <Avatar color="blue" size={40}>
                          BH
                        </Avatar>
                        <div>
                          <Text>Bob Handsome</Text>
                          <Text color="dimmed" size="xs">
                            bob@handsome.inc
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  </Stack>
                  <Divider />
                  <Stack sx={{ padding: 20, gap: 5 }}>
                    <NavLink
                      active={pathname.startsWith(
                        `/profile/${state.userData.username}`
                      )}
                      component={Link}
                      icon={<User />}
                      label={'My Profile'}
                      onClick={() => setMobileDrawerOpen(false)}
                      sx={{ color: 'black' }}
                      to={`profile/${state.userData.username}`}
                    />
                  </Stack>
                </>
              ) : (
                <Stack sx={{ padding: 20 }}>
                  <Button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      toggleAuthModal(true);
                    }}
                    sx={{ height: 40 }}
                  >
                    Log In
                  </Button>
                </Stack>
              )}
              <Divider />
              <Stack sx={{ padding: 20, gap: 5 }}>
                {links.public.map(link => (
                  <NavLink
                    active={link.isSelected(pathname)}
                    component={Link}
                    icon={link.icon}
                    key={link.to}
                    label={link.label}
                    onClick={() => setMobileDrawerOpen(false)}
                    sx={{ color: 'black' }}
                    to={link.to}
                  />
                ))}
              </Stack>
              <Divider />

              {state.isAuthenticated && (
                <>
                  <Stack sx={{ gap: 0, flex: 1, justifyContent: 'end' }}>
                    <Divider />

                    <Stack sx={{ padding: 20 }}>
                      <Button
                        onClick={() => {
                          logout();
                        }}
                        variant="outline"
                      >
                        Logout
                      </Button>
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
          </Drawer>

          <Group position="center">
            <Burger
              onClick={() => setMobileDrawerOpen(true)}
              opened={mobileDrawerOpen}
            />
          </Group>
        </Group>
      </Group>
    </MantineHeader>
  );
};

Header.propTypes = {};

export default Header;
