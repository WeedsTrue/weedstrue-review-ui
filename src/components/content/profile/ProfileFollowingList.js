import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card, Grid, Stack, Text, TextInput } from '@mantine/core';
import PropTypes from 'prop-types';
import ProfileFollowingListItem from './ProfileFollowingListItem';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProfileFollowingList = ({ pkUser }) => {
  const hasFetched = useRef(false);
  const { state, fetchUserFollowing } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({ username: '' });
  const isLoading = !hasFetched.current || state.userFollowing.loading;
  const filteredFollowers = state.userFollowing.value.filter(
    f =>
      !filterState.username ||
      f.username.toLowerCase().includes(filterState.username.toLowerCase())
  );

  useEffect(() => {
    if (pkUser) {
      fetchUserFollowing(pkUser, null, triggerNotification);
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
            <ProfileFollowingListItem />
          </Grid.Col>
          <Grid.Col lg={4} md={4} sm={4} xl={4} xs={4}>
            <ProfileFollowingListItem />
          </Grid.Col>
          <Grid.Col lg={4} md={4} sm={4} xl={4} xs={4}>
            <ProfileFollowingListItem />
          </Grid.Col>
        </Grid>
      ) : filteredFollowers.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 40 }}>
            <Text sx={{ textAlign: 'center' }} weight={500}>
              No Followings found.
            </Text>
          </Stack>
        </Card>
      ) : (
        <Grid>
          {filteredFollowers.map(f => (
            <Grid.Col key={f.pkUser} lg={4} md={4} sm={4} xl={4} xs={4}>
              <ProfileFollowingListItem following={f} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

ProfileFollowingList.propTypes = {
  pkUser: PropTypes.number
};

export default ProfileFollowingList;
