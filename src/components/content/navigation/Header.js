import React, { useContext, useEffect, useRef, useState } from 'react';
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
  UnstyledButton,
  ActionIcon
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Leaf, Logout, User, X } from 'tabler-icons-react';
import { links } from './links';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CustomSearchItem from '../../common/CustomSearchItem';
import SearchInput from '../../common/SearchInput';

const Header = () => {
  const hasSearched = useRef(false);
  const navigate = useNavigate();
  const { state, logout, toggleAuthModal } = useContext(AuthContext);
  const { fetchUserPostProductOptions } = useContext(ReviewsContext);
  const { pathname } = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchData, setSearchData] = useState({ brands: [], products: [] });

  useEffect(() => {
    setSearchData({ brands: [], products: [] });
  }, [pathname]);

  return (
    <MantineHeader
      fixed
      height={60}
      sx={{ flex: 1, display: 'flex', padding: 5 }}
    >
      <Group sx={{ flex: 1, flexWrap: 'nowrap' }}>
        <Group
          sx={mq({
            gap: [10, 10, 20],
            flex: 1,
            flexWrap: 'nowrap',
            justifyContent: 'space-between'
          })}
        >
          <Group
            sx={mq({
              flex: ['unset', 'unset', 'unset', 'unset', 1],
              maxWidth: 200
            })}
          >
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
                  sx={mq({
                    fontSize: 20,
                    display: ['none', 'none', 'flex']
                  })}
                  weight={700}
                >
                  WeedsTrue
                </Text>
              </Group>
            </Link>
          </Group>
          <Group
            noWrap
            sx={mq({
              flex: 3,
              maxWidth: 1400,
              gap: [20, 20, 20, 20, 50],
              justifyContent: 'space-between'
            })}
          >
            <Group
              noWrap
              sx={mq({
                flex: ['unset', 'unset', 'unset', 1],
                gap: 50,
                justifyContent: 'center',
                display: ['none', 'none', 'none', 'flex']
              })}
            >
              <Group
                noWrap
                sx={mq({
                  flex: 1,
                  gap: [10, 10, 10, 10, 30],
                  maxWidth: 500
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
            <Group sx={{ flex: 1, justifyContent: 'center' }}>
              <SearchInput
                data={[
                  ...searchData.brands.map(b => ({
                    label: b.name,
                    value: `/brands/${b.uuid}`
                  })),
                  ...searchData.products.map(p => ({
                    label: p.name,
                    description: p.brand.name,
                    value: `/products/${p.uuid}`
                  }))
                ].sort((a, b) => a.label.localeCompare(b.label))}
                itemComponent={CustomSearchItem}
                onChange={value => {
                  navigate(`${value}`);
                  hasSearched.current = false;
                }}
                onSearch={searchTerm => {
                  if (searchTerm && searchTerm.length > 3) {
                    fetchUserPostProductOptions(searchTerm, searchData =>
                      setSearchData(searchData)
                    );
                    hasSearched.current = true;
                  }
                }}
                placeholder="Search for products or brands..."
                sx={mq({ flex: 1, maxWidth: ['unset', 'unset', 450] })}
              />
            </Group>
          </Group>
          <Group
            sx={mq({
              flex: ['unset', 'unset', 'unset', 'unset', 1],
              maxWidth: 200,
              marginRight: 5,
              justifyContent: 'end',
              display: ['none', 'none', 'none', 'flex']
            })}
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
                    onClick={() =>
                      navigate(`profile/${state.userData.username}`)
                    }
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
                  <Menu.Item
                    icon={<Logout size={20} />}
                    onClick={() => logout()}
                  >
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
              <Group sx={{ padding: 10, justifyContent: 'space-between' }}>
                <Group>
                  <Link
                    onClick={() => setMobileDrawerOpen(false)}
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
                <ActionIcon onClick={() => setMobileDrawerOpen(false)}>
                  <X />
                </ActionIcon>
              </Group>
              <Divider />
              {state.isAuthenticated ? (
                <>
                  <Stack sx={{ padding: 10, paddingBottom: 13 }}>
                    <UnstyledButton
                      component={Link}
                      onClick={() => setMobileDrawerOpen(false)}
                      to={`profile/${state.userData.username}`}
                    >
                      <Group>
                        <Avatar
                          color="blue"
                          size={40}
                          src={state.userData.avatar}
                        />
                        <div>
                          <Text>{state.userData.username}</Text>
                          <Text color="dimmed" size="xs">
                            {state.userData.email}
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  </Stack>
                  <Divider />
                  <Stack sx={{ padding: 10, gap: 5 }}>
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
                <Stack sx={{ padding: 10 }}>
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
              <Stack sx={{ padding: 10, gap: 5 }}>
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
