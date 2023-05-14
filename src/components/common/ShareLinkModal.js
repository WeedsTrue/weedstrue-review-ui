import React from 'react';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import PropTypes from 'prop-types';
import ResponsiveModal from './ResponsiveModal';
import { mq } from '../../config/theme';
import { triggerNotification } from '../../helpers/notificationHelper';

const ShareLinkModal = ({ title, pathname, onClose, opened }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);

    triggerNotification('Link copied!', 'Success', 'green');
  };

  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={opened}
      size={400}
      title={title}
    >
      <Stack sx={{ padding: 20, flex: 1 }}>
        <Group sx={mq({ gap: [10, 5] })}>
          <TextInput
            onChange={() => {}}
            style={{ flex: 1 }}
            value={`${window.location.origin}${pathname}`}
          />
          <Button onClick={onCopy} sx={mq({ width: ['100%', 'unset'] })}>
            Copy
          </Button>
        </Group>
      </Stack>
    </ResponsiveModal>
  );
};

ShareLinkModal.propTypes = {
  opened: PropTypes.bool,
  pathname: PropTypes.string,
  title: PropTypes.any,
  onClose: PropTypes.func
};

export default ShareLinkModal;
