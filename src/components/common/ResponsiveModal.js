import React from 'react';
import { ActionIcon, Divider, Group, Modal, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { X } from 'tabler-icons-react';
import { mq } from '../../config/theme';

const ResponsiveModal = ({
  title,
  size,
  noHeader,
  onClose,
  children,
  ...rest
}) => {
  return (
    <Modal
      {...rest}
      onClose={onClose}
      styles={{
        body: mq({
          padding: '0px !important',
          height: ['100%', '100%', 'unset'],
          display: 'flex',
          flex: 1
        }),
        inner: {
          padding: '0px !important'
        },
        content: mq({
          height: ['100%', '100%', 'unset'],
          width: ['100%', '100%', size ?? 600],
          maxHeight: '100% !important',
          flex: ['1 !important', '1 !important', 'unset !important']
        }),
        ...rest.styles
      }}
      sx={{ overflow: 'hidden', ...rest.sx }}
      withCloseButton={false}
    >
      <Stack sx={{ flex: 1, gap: 0, minWidth: 0 }}>
        {!noHeader && (
          <Stack
            sx={{
              gap: 0
            }}
          >
            {!noHeader && (
              <>
                <Group
                  sx={{
                    minWidth: 100,
                    gap: 10,
                    padding: '12px 16px',
                    placeItems: 'end',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack style={{ flex: 1 }}>{title}</Stack>
                  <ActionIcon onClick={onClose}>
                    <X />
                  </ActionIcon>
                </Group>
                <Divider />
              </>
            )}
          </Stack>
        )}

        {children}
      </Stack>
    </Modal>
  );
};

ResponsiveModal.propTypes = {
  children: PropTypes.any,
  noHeader: PropTypes.bool,
  size: PropTypes.number,
  title: PropTypes.node,
  onClose: PropTypes.func
};

export default ResponsiveModal;
