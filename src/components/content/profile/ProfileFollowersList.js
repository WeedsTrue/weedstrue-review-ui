import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, Grid, Stack, Text, TextInput } from '@mantine/core';
import PropTypes from 'prop-types';
import ProfileFollowerListItem from './ProfileFollowerListItem';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProfileFollowersList = ({ pkUser, isCurrentUsersProfile }) => {
  const hasFetched = useRef(false);
  const { state, fetchUserFollowers } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({ username: '' });
  const isLoading = !hasFetched.current || state.userFollowers.loading;
  const filteredFollowers = state.userFollowers.value.filter(
    f =>
      !filterState.username ||
      f.username.toLowerCase().includes(filterState.username.toLowerCase())
  );

  useEffect(() => {
    if (pkUser) {
      fetchUserFollowers(pkUser, null, triggerNotification);
      setFilterState({ username: '' });
      hasFetched.current = true;
    }
  }, [pkUser]);

  return (
    <Stack>
      <Card>
        <TextInput
          onChange={e =>
            setFilterState({
              username: e.currentTarget.value
            })
          }
          placeholder="Search..."
          value={filterState.username}
        />
      </Card>
      {isLoading ? (
        <Grid>
          <Grid.Col lg={4} md={4} sm={4} xl={4} xs={4}>
            <ProfileFollowerListItem canEdit={isCurrentUsersProfile} />
          </Grid.Col>
          <Grid.Col lg={4} md={4} sm={4} xl={4} xs={4}>
            <ProfileFollowerListItem canEdit={isCurrentUsersProfile} />
          </Grid.Col>
          <Grid.Col lg={4} md={4} sm={4} xl={4} xs={4}>
            <ProfileFollowerListItem canEdit={isCurrentUsersProfile} />
          </Grid.Col>
        </Grid>
      ) : filteredFollowers.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 40 }}>
            <Text sx={{ textAlign: 'center' }} weight={500}>
              No Followers found.
            </Text>
          </Stack>
        </Card>
      ) : (
        <Grid>
          {filteredFollowers.map(f => (
            <Grid.Col key={f.pkUser} lg={4} md={4} sm={4} xl={4} xs={4}>
              <ProfileFollowerListItem
                canEdit={isCurrentUsersProfile}
                follower={f}
              />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

ProfileFollowersList.propTypes = {
  isCurrentUsersProfile: PropTypes.bool,
  pkUser: PropTypes.number
};

export default ProfileFollowersList;
