import React from 'react';
import { Divider, List, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const CookiePolicy = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Cookie Policy</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              At WeedsTrue, we use cookies to provide you with the best possible
              user experience. This Cookie Policy explains how we use cookies
              and other tracking technologies on our website.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>1. What are Cookies?</Title>
            <Text size={14}>
              Cookies are small text files that are stored on your device when
              you visit a website. They are commonly used to remember your
              preferences, personalize your browsing experience, and track your
              website usage.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>2. How We Use Cookies</Title>
            <Text size={14}>
              We use cookies to improve your browsing experience and to help us
              understand how our website is being used. Specifically, we use
              cookies for the following purposes:
            </Text>

            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  Authentication: We use cookies to authenticate users and
                  prevent unauthorized access to our website.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Analytics: We use cookies to track user behavior and gather
                  information about how our website is being used. This helps us
                  to improve our website and provide better content and
                  services.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Personalization: We use cookies to remember your preferences
                  and personalize your browsing experience.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Advertising: We may use cookies to show you targeted
                  advertising based on your interests and browsing history.
                </Text>
              </List.Item>
            </List>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>3. Types of Cookies We Use</Title>
            <Text size={14}>
              We use the following types of cookies on our website:
            </Text>

            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  Essential cookies: These cookies are necessary for the
                  operation of our website and cannot be disabled.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Performance cookies: These cookies help us to improve the
                  performance of our website by collecting information about how
                  users interact with our website.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Functionality cookies: These cookies remember your preferences
                  and provide enhanced features and personalization.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Advertising cookies: These cookies are used to show you
                  targeted advertising based on your interests and browsing
                  history.
                </Text>
              </List.Item>
            </List>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>4. Cookie Settings</Title>
            <Text size={14}>
              Most web browsers allow you to control cookies through their
              settings. You can choose to accept or reject cookies, or to be
              notified when a cookie is being used. However, please note that if
              you choose to disable cookies, some features of our website may
              not work properly.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>5. Third-Party Cookies</Title>
            <Text size={14}>
              We may use third-party cookies on our website to provide
              additional features and services. These cookies are subject to the
              privacy policies of the third-party providers, and we do not have
              control over their use.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>6. Updates to this Policy</Title>
            <Text size={14}>
              We may update this Cookie Policy from time to time to reflect
              changes in our use of cookies and other tracking technologies. We
              encourage you to review this policy periodically for any updates
              or changes.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>7. Contact Us</Title>
            <Text size={14}>
              If you have any questions or concerns about our use of cookies,
              please contact us at weedstrue@outlook.com.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CookiePolicy;
