import React from 'react';
import { Divider, Stack, Text, Title } from '@mantine/core';
import { mq } from '../../../config/theme';

const Disclaimer = () => {
  return (
    <Stack sx={mq({ gap: [0, 0, 10], flex: 1 })}>
      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Title order={3}>WeedsTrue - Disclaimer</Title>
      </Stack>
      <Divider />

      <Stack sx={mq({ padding: [10, 10, 0] })}>
        <Stack sx={mq({ gap: [10, 10, 20] })}>
          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              The information contained on WeedsTrue is for general information
              purposes only. While we strive to provide accurate and up-to-date
              information, we make no representations or warranties of any kind,
              express or implied, about the completeness, accuracy, reliability,
              suitability, or availability with respect to the website or the
              information, products, services, or related graphics contained on
              the website for any purpose. Any reliance you place on such
              information is therefore strictly at your own risk.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              In no event will we be liable for any loss or damage including
              without limitation, indirect or consequential loss or damage, or
              any loss or damage whatsoever arising from loss of data or profits
              arising out of, or in connection with, the use of this website.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              Through this website, you may be able to link to other websites
              that are not under the control of WeedsTrue. We have no control
              over the nature, content, and availability of those sites. The
              inclusion of any links does not necessarily imply a recommendation
              or endorsement of the views expressed within them.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              Every effort is made to keep the website up and running smoothly.
              However, WeedsTrue takes no responsibility for, and will not be
              liable for, the website being temporarily unavailable due to
              technical issues beyond our control.
            </Text>
          </Stack>

          <Stack sx={{ gap: 5 }}>
            <Text size={14}>
              We reserve the right to make changes to this disclaimer at any
              time without notice. By using our website, you agree to the terms
              of this disclaimer.
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Disclaimer;
