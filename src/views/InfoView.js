import React from 'react';
import { Card, Divider, Group, Stack } from '@mantine/core';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccessibilityPolicy from '../components/content/info/AccessibilityPolicy';
import AntiSpamPolicy from '../components/content/info/AntiSpamPolicy';
import CommunityGuidelines from '../components/content/info/CommunityGuidelines';
import CookiePolicy from '../components/content/info/CookiePolicy';
import CopyrightNotice from '../components/content/info/CopyrightNotice';
import Disclaimer from '../components/content/info/Disclaimer';
import PolicyNavigation from '../components/content/info/PolicyNavigation';
import PrivacyPolicy from '../components/content/info/PrivacyPolicy';
import TermsOfUse from '../components/content/info/TermsOfUse';
import { mq } from '../config/theme';

const InfoView = () => {
  return (
    <Card style={{ flex: 1, padding: 0 }}>
      <Stack sx={mq({ flex: 1, padding: [0, 0, 20] })}>
        <Group
          sx={mq({
            flex: 1,
            maxWidth: 1100,
            alignSelf: 'center',
            width: '100%',
            alignItems: 'start',
            gap: [0, 0, 20],
            flexDirection: ['column', 'column', 'row']
          })}
        >
          <Stack
            sx={mq({
              flex: 1,
              maxWidth: ['unset', 'unset', 250],
              alignSelf: 'stretch',
              gap: [0, 0, 20]
            })}
          >
            <PolicyNavigation />
          </Stack>
          <Divider
            orientation="vertical"
            sx={mq({ display: ['none', 'none', 'flex'] })}
          />

          <Stack style={{ flex: 1 }}>
            <Routes>
              <Route element={<PrivacyPolicy />} path="/privacy-policy" />
              <Route element={<TermsOfUse />} path="/terms-of-use" />
              <Route
                element={<AccessibilityPolicy />}
                path="/accessibility-policy"
              />
              <Route element={<CookiePolicy />} path="/cookie-policy" />
              <Route element={<CopyrightNotice />} path="/copyright-notice" />
              <Route element={<AntiSpamPolicy />} path="/anti-spam-policy" />
              <Route
                element={<CommunityGuidelines />}
                path="/community-guidelines"
              />
              <Route element={<Disclaimer />} path="/disclaimer" />
              <Route
                element={<Navigate replace to="/info/privacy-policy" />}
                path="*"
              />
            </Routes>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

export default InfoView;
