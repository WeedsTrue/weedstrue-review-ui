import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserSettingsView from '../components/content/settings/UserSettingsView';

const SettingsView = () => {
  return (
    <Routes>
      <Route element={<UserSettingsView />} path="/:view" />
      <Route element={<Navigate replace to="/settings/account" />} path="*" />
    </Routes>
  );
};

export default SettingsView;
