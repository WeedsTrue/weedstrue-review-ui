import React, { useContext, useState } from 'react';
import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const DeleteCommentModal = ({ opened, onClose, comment, onDelete }) => {
  const { deleteComment } = useContext(ReviewsContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={opened}
      title={<Title order={3}>Delete Comment</Title>}
    >
      <Stack sx={{ padding: 20 }}>
        <Text sx={{ textAlign: 'center' }}>
          Are you sure you want to deleted the selected comment?
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
            deleteComment(
              comment.pkComment,
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

DeleteCommentModal.propTypes = {
  comment: PropTypes.object,
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

export default DeleteCommentModal;
