import React from 'react';
import { Divider, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const CommunityGuidelines = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Community Guidelines</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              At WeedsTrue, we are committed to creating a safe and welcoming
              environment for our users. These Community Guidelines are designed
              to ensure that all users can enjoy our website without fear of
              harassment, discrimination, or other abusive behaviors. By using
              our website, you agree to abide by these guidelines.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>1. Be Respectful</Title>
            <Text size={14}>
              We encourage open and respectful discussions on our website.
              Please be considerate of other users and refrain from using
              offensive or inflammatory language. Do not harass, threaten, or
              insult other users based on their race, ethnicity, gender, sexual
              orientation, religion, or any other personal characteristic.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>2. Stay On-Topic</Title>
            <Text size={14}>
              Our website is dedicated to specific topics and discussions.
              Please keep your comments and posts relevant to the discussion at
              hand. Do not post spam, advertisements, or unrelated content on
              our website.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>3. Protect Your Privacy</Title>
            <Text size={14}>
              Please protect your privacy and the privacy of others on our
              website. Do not share personal information such as full names,
              phone numbers, or addresses. If you are posting about another
              person, please obtain their consent before doing so.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>4. Report Abuse</Title>
            <Text size={14}>
              If you see any abusive or inappropriate behavior on our website,
              please report it to our moderators immediately. We take all
              reports of harassment, discrimination, or other abusive behaviors
              seriously and will investigate them promptly.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>
              5. Consequences of Violating Community Guidelines
            </Title>
            <Text size={14}>
              We reserve the right to remove any content or users who violate
              our Community Guidelines. Depending on the severity of the
              violation, we may issue warnings, suspend accounts, or permanently
              ban users from our website. We will always strive to be fair and
              transparent in our enforcement of these guidelines.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>6. Changes to Community Guidelines</Title>
            <Text size={14}>
              We may update or modify these Community Guidelines at any time. We
              will notify users of any changes and provide an opportunity for
              feedback before implementing them.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Title order={5}>6. Contact Us</Title>
            <Text size={14}>
              If you have any questions or concerns about our Community
              Guidelines, please contact us at weedstrue@outlook.com.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CommunityGuidelines;
