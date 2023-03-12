import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProfileDetails from '../components/content/profile/ProfileDetails';
import { Context as AuthContext } from '../providers/AuthProvider';

const ProfileView = () => {
  const { state } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<ProfileDetails />} path="/:username/*" />
      <Route
        element={
          state.isAuthenticated ? (
            <Navigate replace to={`/profile/${state.userData?.username}`} />
          ) : (
            <Navigate replace to={'/'} />
          )
        }
        path="/"
      />
      <Route element={<Navigate replace to="/profile" />} path="*" />
    </Routes>
  );
};

export default ProfileView;
