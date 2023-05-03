import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const ProfileView = () => {
  return (
    <Routes>
      <Route element={<ProfileDetails />} path="/" />
      <Route element={<ProfileSettings />} path="/settings" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
};

export default ProfileView;
