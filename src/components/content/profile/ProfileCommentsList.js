import React, { useContext, useEffect } from 'react';
import { Card, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import ProfileCommentListItem from './ProfileCommentListItem';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const ProfileCommentsList = ({ pkUser }) => {
  const { state, fetchUserProfileComments } = useContext(ReviewsContext);
  const isLoading = false;

  useEffect(() => {
    if (pkUser) {
      fetchUserProfileComments(pkUser);
    }
  }, [pkUser]);

  return (
    <Stack sx={{ flex: 1, gap: 15, alignSelf: 'stretch' }}>
      {isLoading ? (
        <>
          <ProfileCommentListItem />
          <ProfileCommentListItem />
          <ProfileCommentListItem />
          <ProfileCommentListItem />
        </>
      ) : state.userProfileComments.value.length === 0 ? (
        <Card>
          <Stack sx={{ padding: 60 }}>
            <Text sx={{ margin: 'auto' }} weight={500}>
              No Comments Available
            </Text>
          </Stack>
        </Card>
      ) : (
        state.userProfileComments.value.map(c => (
          <ProfileCommentListItem
            comment={c}
            fkUser={pkUser}
            key={c.pkComment}
          />
        ))
      )}
    </Stack>
  );
};

ProfileCommentsList.propTypes = {
  pkUser: PropTypes.number
};

export default ProfileCommentsList;
