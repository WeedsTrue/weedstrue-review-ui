import React, { useState } from 'react';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Notes, Trash } from 'tabler-icons-react';

const DraftSelectItem = ({ userPost, isBeingEdited, onDelete, onSelect }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Group
      onClick={() => onSelect(userPost)}
      sx={{
        padding: '8px 16px',
        cursor: 'pointer',
        '&:hover': {
          background: 'rgba(30,144,255,0.1)'
        }
      }}
    >
      <Notes color="grey" />
      <Stack sx={{ flex: 1, gap: 5, overflow: 'hidden' }}>
        <Text
          sx={{
            fontSize: 14,
            lineHeight: '16px',
            whiteSpace: 'pre',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1
          }}
          weight={isBeingEdited ? 700 : 'normal'}
        >
          {isBeingEdited ? `EDITING: ${userPost.title}` : userPost.title}
        </Text>
        <Text sx={{ fontSize: 14, lineHeight: '16px' }}>
          Draft Saved {dayjs(userPost.created).format('DD/MM/YYYY')}
        </Text>
      </Stack>
      <Stack>
        {confirmDelete ? (
          <Text
            color="red"
            onClick={e => {
              e.stopPropagation();
              onDelete(userPost);
            }}
            weight={500}
          >
            {isBeingEdited ? 'Delete working draft?' : 'Confirm'}
          </Text>
        ) : (
          <ActionIcon
            onClick={e => {
              e.stopPropagation();
              setConfirmDelete(true);
            }}
            variant="transparent"
          >
            <Trash />
          </ActionIcon>
        )}
      </Stack>
    </Group>
  );
};

DraftSelectItem.propTypes = {
  isBeingEdited: PropTypes.bool,
  userPost: PropTypes.object,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

export default DraftSelectItem;
