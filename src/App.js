import React, { useContext, useEffect, useRef } from 'react';
import { AppShell, Box, Loader, MantineProvider, Stack } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import Footer from './components/content/navigation/Footer';
import Header from './components/content/navigation/Header';
import GlobalStyles from './config/GlobalStyles';
import { theme } from './config/theme';
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './providers/AuthProvider';
import { Provider as ReviewsProvider } from './providers/ReviewsProvider';
import BrandsView from './views/BrandsView';
import ProductsView from './views/ProductsView';

const App = () => {
  const hasAttemptedToken = useRef(false);
  const { state, tokenLogin } = useContext(AuthContext);

  useEffect(() => {
    if (!state.tokenAttempted) {
      tokenLogin();
      hasAttemptedToken.current = true;
    }
  }, []);

  return (
    <AppShell
      // footer={<Footer />}
      header={<Header />}
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
        {hasAttemptedToken.current && !state.loading ? (
          <Routes>
            <Route element={<BrandsView />} path="/brands/*" />
            <Route element={<ProductsView />} path="/products/*" />
            <Route element={<ProductsView />} path="/" />
            {state.isAuthenticated ? <></> : <></>}
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        ) : (
          <Stack sx={{ margin: 'auto', justifyContent: 'center' }}>
            <Loader />
          </Stack>
        )}
      </Box>
    </AppShell>
  );
};

export default () => (
  <AuthProvider>
    <ReviewsProvider>
      <MantineProvider theme={theme}>
        <NotificationsProvider position="top-right">
          <GlobalStyles />
          <Router>
            <App />
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </ReviewsProvider>
  </AuthProvider>
);
