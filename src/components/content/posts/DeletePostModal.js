import React, { useContext, useState } from 'react';
import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const DeletePostModal = ({ opened, onClose, userPost, onDelete }) => {
  const { deleteUserPost } = useContext(ReviewsContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={opened}
      title={<Title order={3}>Delete Post</Title>}
    >
      <Stack sx={{ padding: 20 }}>
        <Text sx={{ textAlign: 'center' }} weight={500}>
          Are you sure you want to deleted the selected post?
        </Text>
      </Stack>
      <Divider />
      <Group sx={{ justifyContent: 'center', padding: 20 }}>
        <Button
          color="dark"
          disabled={isLoading}
          onClick={onClose}
          sx={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          color="red"
          loading={isLoading}
          onClick={() => {
            setIsLoading(true);
            deleteUserPost(
              userPost.pkUserPost,
              () => {
                onClose();
                if (onDelete) {
                  onDelete();
                }
              },
              message => {
                setIsLoading();
                triggerNotification(message);
              }
            );
          }}
          sx={{ flex: 1 }}
        >
          Delete
        </Button>
      </Group>
    </ResponsiveModal>
  );
};

DeletePostModal.propTypes = {
  opened: PropTypes.bool,
  userPost: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

export default DeletePostModal;
