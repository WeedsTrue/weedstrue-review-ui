import React from 'react';
import { Divider, List, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const AntiSpamPolicy = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Anti-Spam Policy</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              At WeedsTrue, we are committed to protecting our users from spam
              and unwanted messages. This Anti-Spam Policy explains how we
              prevent and handle spam on our website.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>1. What is Spam?</Title>
            <Text size={14}>
              Spam is any unsolicited or unwanted message that is sent to a
              large number of recipients without their consent. Examples of spam
              include unsolicited commercial emails, bulk messages, and messages
              containing viruses or other harmful content.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>2. Our Anti-Spam Policy</Title>
            <Text size={14}>
              We do not tolerate spam on our website and take proactive measures
              to prevent it. Specifically, we:
            </Text>
            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  Require user consent: We only send messages to users who have
                  given us their explicit consent to receive them.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Provide unsubscribe options: We include unsubscribe links in
                  all of our messages, giving users the ability to opt-out of
                  future communications.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Monitor user behavior: We monitor user behavior on our website
                  to detect and prevent spam and other abusive activities.
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Enforce our policies: We take appropriate action against users
                  who violate our Anti-Spam Policy, including account suspension
                  or termination.
                </Text>
              </List.Item>
            </List>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>3. Reporting Spam</Title>
            <Text size={14}>
              If you receive spam from our website, please report it to us
              immediately by contacting our customer support team. We will
              investigate the matter promptly and take appropriate action to
              prevent further spam from being sent.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>4. Compliance with Applicable Laws</Title>
            <Text size={14}>
              We comply with all applicable laws and regulations regarding spam,
              including Canada's Anti-Spam Legislation (CASL). We also require
              our users to comply with these laws and regulations when using our
              website.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>5. Contact Us</Title>
            <Text size={14}>
              If you have any questions or concerns about our Anti-Spam Policy,
              please contact us at weedstrue@outlook.com.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AntiSpamPolicy;
