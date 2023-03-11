import React from 'react';
import { ActionIcon, Divider, Group, Modal, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { X } from 'tabler-icons-react';

const ResponsiveModal = ({ title, noHeader, onClose, children, ...rest }) => {
  return (
    <Modal
      {...rest}
      onClose={onClose}
      styles={{
        body: {
          padding: '0px !important'
        },
        inner: {
          padding: '0px !important'
        },
        ...rest.styles
      }}
      sx={{ overflow: 'hidden', ...rest.sx }}
      withCloseButton={false}
    >
      <Stack sx={{ gap: 0, flex: 1, overflow: 'hidden', maxWidth: 600 }}>
        {!noHeader && (
          <>
            <Group
              sx={{
                gap: 10,
                padding: '12px 16px',
                placeItems: 'end',
                justifyContent: 'space-between'
              }}
            >
              <Stack sx={{ flex: 1 }}>{title}</Stack>
              <ActionIcon onClick={onClose}>
                <X />
              </ActionIcon>
            </Group>
            <Divider />
          </>
        )}
      </Stack>
      {children}
    </Modal>
  );
};

ResponsiveModal.propTypes = {
  children: PropTypes.any,
  noHeader: PropTypes.bool,
  title: PropTypes.node,
  onClose: PropTypes.func
};

export default ResponsiveModal;
