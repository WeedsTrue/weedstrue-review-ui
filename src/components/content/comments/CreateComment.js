import React, { useContext, useState } from 'react';
import { Button, Group, Stack, Textarea } from '@mantine/core';
import PropTypes from 'prop-types';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';

const CreateComment = ({ fkUserPost, fkCommentParent, onSuccess }) => {
  const { createComment } = useContext(ReviewsContext);
  const [formState, setFormState] = useState({
    content: '',
    isLoading: false
  });

  return (
    <Stack
      component="form"
      onSubmit={e => {
        e.preventDefault();
        setFormState({
          ...formState,
          isLoading: true
        });
        createComment(
          {
            content: formState.content,
            fkUserPost,
            fkCommentParent
          },
          () => {
            setFormState({
              content: '',
              isLoading: false
            });
            if (onSuccess) {
              onSuccess();
            }
          },
          message => {
            triggerNotification(message);
            setFormState({
              ...formState,
              isLoading: false
            });
          }
        );
      }}
      sx={{ gap: 0, flex: 1 }}
    >
      <Textarea
        minRows={4}
        onChange={e =>
          setFormState({
            ...formState,
            content: e.currentTarget.value.substring(0, 500)
          })
        }
        placeholder="What are your thoughts?"
        required
        sx={{ flex: 1 }}
        value={formState.content}
      />
      <Group
        sx={{
          border: 'solid 1px lightgrey',
          borderTop: 'none',
          justifyContent: 'end',
          padding: '5px 10px'
        }}
      >
        <Button
          disabled={!formState.content}
          loading={formState.isLoading}
          radius="xl"
          size="xs"
          type="submit"
          variant="filled"
        >
          {fkCommentParent ? 'Reply' : 'Comment'}
        </Button>
      </Group>
    </Stack>
  );
};

CreateComment.propTypes = {
  fkCommentParent: PropTypes.number,
  fkUserPost: PropTypes.number,
  onSuccess: PropTypes.func
};

export default CreateComment;