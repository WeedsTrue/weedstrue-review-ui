import React, { useContext, useEffect } from 'react';
import { Card, Group, Stack } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileSidebarInfo from './ProfileSidebarInfo';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CustomTab from '../../common/CustomTab';
import PostList from '../posts/PostList';

const ProfileDownvoteList = () => {
  return <Stack sx={{ gap: 20 }}></Stack>;
};

ProfileDownvoteList.propTypes = {};

export default ProfileDownvoteList;