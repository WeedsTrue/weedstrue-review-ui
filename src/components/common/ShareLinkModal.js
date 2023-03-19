import React from 'react';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import PropTypes from 'prop-types';
import ResponsiveModal from './ResponsiveModal';
import { triggerNotification } from '../../helpers/notificationHelper';

const ShareLinkModal = ({ title, pathname, onClose, opened }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);

    triggerNotification('Copied link!', 'Success', 'green');
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
        <Group sx={{ gap: 5 }}>
          <TextInput
            onChange={() => {}}
            sx={{ flex: 1 }}
            value={`${window.location.origin}${pathname}`}
          />
          <Button onClick={onCopy}>Copy</Button>
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
