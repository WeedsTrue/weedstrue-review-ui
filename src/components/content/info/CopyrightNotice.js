import React from 'react';
import { Divider, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const CopyrightNotice = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Copyright Notice</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              All content on this website, including but not limited to text,
              graphics, logos, images, and software, is the property of
              WeedsTrue and is protected by Canadian and international copyright
              laws. Unauthorized use of any content from this website may
              violate copyright laws and may result in legal action.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              You may not reproduce, modify, distribute, or otherwise use any
              content from this website without the express written permission
              of WeedsTrue. Requests for permission to use any content from this
              website should be directed to WeedsTrue.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CopyrightNotice;
