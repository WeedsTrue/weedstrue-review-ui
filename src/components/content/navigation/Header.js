import React, { useContext } from 'react';
import {
  Header as MantineHeader,
  Avatar,
  Text,
  Group,
  Menu,
  Button,
  Stack
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
                <Text
                  sx={mq({ fontSize: 20, display: ['none', 'block'] })}
                  weight={700}
                >
                  WeedsTrue
                </Text>
              </Group>
            </Link>
          </Group>
          <Group sx={{ flex: 3, gap: 50 }}>
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
        <Group sx={{ marginRight: 5 }}>
          {state.isAuthenticated ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  rightIcon={<ChevronDown />}
                  sx={mq({})}
                  variant="outline"
                >
                  <Group sx={{ gap: 10 }}>
                    <Avatar color="blue" radius={100} size={29} src={null}>
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
      </Group>
    </MantineHeader>
  );
};

Header.propTypes = {};

export default Header;
