import React, { useContext, useEffect, useRef } from 'react';
import { AppShell, Box, Loader, MantineProvider, Stack } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import AuthModal from './components/content/auth/AuthModal';
import Header from './components/content/navigation/Header';
import CreatePost from './components/content/posts/CreatePost';
import GlobalStyles from './config/GlobalStyles';
import { theme } from './config/theme';
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './providers/AuthProvider';
import { Provider as ReviewsProvider } from './providers/ReviewsProvider';
import AgeVerificationView from './views/AgeVerificationView';
import BrandsView from './views/BrandsView';
import PostsView from './views/PostsView';
import ProductsView from './views/ProductsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';

const App = () => {
  const hasAttemptedToken = useRef(false);
  const { state, tokenLogin } = useContext(AuthContext);
  const ageVerifiedAt = localStorage.getItem('ageVerifiedAt');
  const isAgeVerified = ageVerifiedAt
    ? dayjs().diff(new Date(ageVerifiedAt), 'd') < 30
    : false;

  useEffect(() => {
    if (!state.tokenAttempted) {
      tokenLogin();
      hasAttemptedToken.current = true;
    }
  }, []);

  return (
    <AppShell
      // footer={<Footer />}
      header={isAgeVerified && <Header />}
      padding={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%'
      }}
    >
      <Box
        sx={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex'
        }}
      >
        {!isAgeVerified ? (
          <AgeVerificationView />
        ) : (
          <Routes>
            <Route element={<BrandsView />} path="/brands/*" />
            <Route element={<CreatePost />} path="/submit" />
            <Route element={<ProductsView />} path="/products/*" />
            <Route element={<ProfileView />} path="/profile/*" />
            <Route element={<SettingsView />} path="/settings/*" />
            <Route element={<PostsView />} path="/" />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        )}
      </Box>
      <AuthModal
        defaultView={state.defaultAuthModalView}
        isOpen={state.showAuthModal}
      />
    </AppShell>
  );
};

export default () => (
  <AuthProvider>
    <ReviewsProvider>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <GlobalStyles />
        <Router>
          <App />
        </Router>
      </MantineProvider>
    </ReviewsProvider>
  </AuthProvider>
);
