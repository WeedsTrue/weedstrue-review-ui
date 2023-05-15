import React from 'react';
import { Divider, List, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const TermsOfUse = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Terms of Use</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              Welcome to WeedsTrue! By accessing and using this website, you
              agree to be bound by these terms of use. If you do not agree to
              these terms, please do not use our site.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>1. Age Restriction</Title>
            <Text size={14}>
              This website is intended for use by individuals who are 19 years
              of age or older. By using this site, you represent and warrant
              that you are at least 19 years of age.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>2. User Conduct</Title>
            <Text size={14}>
              You agree to use this website in a responsible and lawful manner.
              Specifically, you agree not to:
            </Text>

            <List sx={mq({ marginLeft: 20, marginRight: [20, 20, 0] })}>
              <List.Item>
                <Text size={14}>
                  Post or transmit any material that is unlawful, harmful,
                  threatening, abusive, harassing, defamatory, vulgar, obscene,
                  or otherwise objectionable
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Impersonate any person or entity or falsely represent your
                  affiliation with any person or entity
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Engage in any activity that could harm or disrupt the site or
                  its servers, or that could interfere with other users' use of
                  the site
                </Text>
              </List.Item>
              <List.Item>
                <Text size={14}>
                  Violate any applicable laws, regulations, or third-party
                  rights
                </Text>
              </List.Item>
            </List>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>3. Intellectual Property</Title>
            <Text size={14}>
              The content on this website, including text, graphics, images, and
              logos, is protected by copyright and other intellectual property
              laws. You may not reproduce, distribute, modify, or create
              derivative works from any content on this site without our prior
              written consent.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>4. Third-Party Links</Title>
            <Text size={14}>
              This website may contain links to third-party websites that are
              not owned or controlled by WeedsTrue. We have no control over, and
              assume no responsibility for, the content, privacy policies, or
              practices of any third-party websites. By using this website, you
              expressly release WeedsTrue from any and all liability arising
              from your use of any third-party website.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>5. Limitation of Liability</Title>
            <Text size={14}>
              To the maximum extent permitted by law, WeedsTrue shall not be
              liable for any direct, indirect, incidental, special, or
              consequential damages arising out of or in any way connected with
              the use of this website, whether based on contract, tort, strict
              liability, or any other theory of liability.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>6. Indemnification</Title>
            <Text size={14}>
              You agree to indemnify, defend, and hold us harmless from and
              against any and all claims, damages, liabilities, costs, and
              expenses (including reasonable attorneys' fees) arising out of or
              in connection with your use of this site or your violation of
              these terms of use.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>7. Governing Law</Title>
            <Text size={14}>
              These terms of use will be governed by and construed in accordance
              with the laws of Canada and the province or territory in which the
              website is hosted.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>8. Changes to these Terms of Use</Title>
            <Text size={14}>
              We may update these terms of use from time to time to reflect
              changes in our practices or legal requirements. We will post the
              updated terms on our site and notify users of any material
              changes.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>9. Termination</Title>
            <Text size={14}>
              We reserve the right to terminate your access to this site at any
              time for any reason without notice.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>10. Contact Us</Title>
            <Text size={14}>
              If you have any questions or concerns about these terms of use,
              please contact us at weedstrue@outlook.com.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TermsOfUse;
