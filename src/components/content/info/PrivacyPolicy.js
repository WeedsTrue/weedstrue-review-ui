import React from 'react';
import { Divider, List, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const PrivacyPolicy = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Privacy Policy</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              WeedsTrue is committed to protecting the privacy of its users.
              This privacy policy explains how we collect, use, and disclose
              personal information about our users who are 19 years of age or
              older.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Collection of Personal Information</Title>

            <Text size={14}>
              We may collect personal information from users in a variety of
              ways, including:
            </Text>
            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>When users create an account on our site</Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  When users submit a form or contact us through our site
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  When users sign up to receive our newsletters or other
                  communications
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  When users participate in surveys or promotions on our site
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  When users make a purchase through our site
                </Text>
              </List.Item>
            </List>

            <Text size={14}>
              The personal information we may collect includes:
            </Text>
            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>Name</Text>
              </List.Item>
              <List.Item>
                <Text size={14}>Email address</Text>
              </List.Item>
              <List.Item>
                <Text size={14}>Mailing address</Text>
              </List.Item>
              <List.Item>
                <Text size={14}>Phone number</Text>
              </List.Item>
              <List.Item>
                <Text size={14}>Payment information</Text>
              </List.Item>
            </List>
            <Text size={14}>
              We may also collect information about users' activities on our
              site, such as the pages they visit and the content they interact
              with.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Use of Personal Information</Title>
            <Text size={14}>
              We use the personal information we collect from users for a
              variety of purposes, including:
            </Text>
            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  To provide our services to users, including processing
                  transactions and responding to inquiries
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  To communicate with users about our services, promotions, and
                  other news
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  To improve our site and customize users' experiences
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  To analyze users' behavior on our site and measure the
                  effectiveness of our marketing efforts
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  To comply with legal and regulatory requirements
                </Text>
              </List.Item>
            </List>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Disclosure of Personal Information</Title>
            <Text size={14}>
              We may disclose users' personal information to third parties in
              the following circumstances:
            </Text>
            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  To our service providers who assist us in providing our
                  services to users
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  To law enforcement or other government officials in response
                  to a lawful request or as required by law
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  To a potential buyer or investor in the event of a sale or
                  merger of our company
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>With the user's consent</Text>
              </List.Item>
            </List>
            <Text size={14}>
              We do not sell or rent users' personal information to third
              parties for marketing purposes.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Retention of Personal Information</Title>
            <Text size={14}>
              We retain users' personal information for as long as necessary to
              fulfill the purposes for which it was collected, or as required by
              law.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Security of Personal Information</Title>
            <Text size={14}>
              We take reasonable measures to protect users' personal information
              from unauthorized access, use, or disclosure. However, no method
              of transmission over the internet or electronic storage is
              completely secure, so we cannot guarantee the absolute security of
              users' personal information.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Changes to this Privacy Policy</Title>
            <Text size={14}>
              We may update this privacy policy from time to time to reflect
              changes to our practices or legal requirements. We will post the
              updated policy on our site and notify users of any material
              changes.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>Contact Us</Title>
            <Text size={14}>
              If you have any questions or concerns about our privacy policy or
              our handling of personal information, please contact us at
              weedstrue@outlook.com.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PrivacyPolicy;
