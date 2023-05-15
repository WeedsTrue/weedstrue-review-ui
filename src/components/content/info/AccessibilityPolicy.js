import React from 'react';
import { Divider, List, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const AccessibilityPolicy = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Accessibility Policy</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              At WeedsTrue, we are committed to ensuring that our website is
              accessible to all users, including those with disabilities. We
              strive to comply with the Accessibility for Ontarians with
              Disabilities Act (AODA) and other applicable accessibility laws
              and regulations.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>
              1. Web Content Accessibility Guidelines (WCAG)
            </Title>
            <Text size={14}>
              Our website is designed to conform with Level AA of the Web
              Content Accessibility Guidelines (WCAG) 2.1. These guidelines
              provide recommendations for making web content more accessible for
              people with disabilities, including visual, auditory, physical,
              speech, cognitive, and neurological disabilities.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>2. Accessibility Features</Title>
            <Text size={14}>
              We have implemented the following accessibility features on our
              website:
            </Text>
            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  Alternative text for all images and non-text content
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Clear and simple language to ensure content is easy to
                  understand
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Descriptive headings and titles to help users navigate the
                  website
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>Closed captions for all videos</Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  An accessible feedback mechanism for users to report any
                  issues with website accessibility
                </Text>
              </List.Item>
            </List>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>3. Ongoing Accessibility Efforts</Title>
            <Text size={14}>
              We are committed to continuously improving the accessibility of
              our website. We will regularly review and update our accessibility
              policy and take the necessary steps to ensure that our website
              meets or exceeds WCAG 2.1 Level AA standards.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>4. Contact Us</Title>
            <Text size={14}>
              If you have any questions or concerns about the accessibility of
              our website, please contact us at weedstrue@outlook.com. We will
              make every effort to address your concerns and ensure that our
              website is accessible to all users.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AccessibilityPolicy;
