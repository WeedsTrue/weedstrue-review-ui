import React from 'react';
import { ActionIcon, Divider, Group, Modal, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
  const isFullScreenMobileView = useMediaQuery('(max-width: 799px)');
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
        content: mq({
          height: ['100%', '100%', 'unset'],
          width: ['100%', '100%', size ?? 600],
          maxHeight: '100% !important',
          flex: ['1 !important', '1 !important', 'unset !important']
        }),
        ...rest.styles
      }}
      sx={{ overflow: 'hidden', ...rest.sx }}
      withCloseButton={isFullScreenMobileView}
    >
      <Stack
        sx={{
          flex: 1
        }}
      >
        {!noHeader && (
          <Stack
            sx={{
              gap: 0,
              flex: 1,
              overflow: 'hidden'
            }}
          >
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
