import React, { useContext, useEffect } from 'react';
import { Loader, Stack } from '@mantine/core';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import UserSettingsView from '../components/content/settings/UserSettingsView';
import { Context as AuthContext } from '../providers/AuthProvider';

const SettingsView = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.tokenAttempted && !state.loading && !state.isAuthenticated) {
      navigate('/');
    }
  }, [state.loading, state.tokenAttempted]);

  return !state.tokenAttempted || state.loading || !state.isAuthenticated ? (
    <Stack sx={{ margin: 'auto', justifyContent: 'center' }}>
      <Loader />
    </Stack>
  ) : (
    <Routes>
      <Route element={<UserSettingsView />} path="/:view" />
      <Route element={<Navigate replace to="/settings/account" />} path="*" />
    </Routes>
  );
};

export default SettingsView;
