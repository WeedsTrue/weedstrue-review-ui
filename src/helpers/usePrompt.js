import React, { useContext, useEffect, useCallback } from 'react';
import { Button, Divider, Group, Stack, Text } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import ResponsiveModal from '../components/common/ResponsiveModal';

const useBlocker = (blocker, when = true) => {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block(tx => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        }
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
};

const usePrompt = (onClose, when = true) => {
  const blocker = useCallback(tx => {
    const element = document.createElement('div');
    element.setAttribute('id', 'prompt-dialog-modal');
    element.setAttribute('aria-hidden', 'true');
    document.body.appendChild(element);
    const root = createRoot(element);

    const onClosePrompt = state => {
      if (element) {
        root.unmount();
      }
      if (!state) {
        document.body.removeChild(element);
      } else {
        tx.retry();
      }
    };

    root.render(
      <ResponsiveModal
        centered
        lockScroll
        onClose={() => onClosePrompt(false)}
        opened
        size={450}
        title={
          <Group sx={{ gap: 10, flex: 1, flexWrap: 'nowrap' }}>
            <Text weight={500}>Save Draft</Text>
          </Group>
        }
      >
        <Stack sx={{ gap: 0 }}>
          <Stack sx={{ padding: 20 }}>
            <Text>Do you want to save a draft of your post?</Text>
          </Stack>
          <Divider />
          <Group sx={{ padding: '20px 10px', justifyContent: 'end' }}>
            <Button
              onClick={() => onClosePrompt(true)}
              radius="xl"
              variant="outline"
            >
              Discard post
            </Button>
            <Button
              onClick={() => {
                onClose();
                onClosePrompt(false);
              }}
              radius="xl"
            >
              Save Draft
            </Button>
          </Group>
        </Stack>
      </ResponsiveModal>
    );
  }, []);

  useBlocker(blocker, when);
};

export { usePrompt };
