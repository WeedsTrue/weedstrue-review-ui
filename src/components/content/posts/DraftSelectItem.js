import React, { useState } from 'react';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Notes, Point, Trash } from 'tabler-icons-react';
const relativeTime = require('dayjs/plugin/relativeTime');

const DraftSelectItem = ({ userPost, isBeingEdited, onDelete, onSelect }) => {
  dayjs.extend(relativeTime);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Group
      onClick={() => onSelect(userPost)}
      sx={{
        overflow: 'hidden',
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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1
          }}
          weight={isBeingEdited ? 700 : 'normal'}
        >
          {isBeingEdited
            ? `EDITING: ${userPost.title ? userPost.title : 'Untitled'}`
            : userPost.title
            ? userPost.title
            : 'Untitled'}
        </Text>
        <Group sx={{ gap: 5 }}>
          {userPost.postItemName && (
            <>
              <Text sx={{ fontSize: 14, lineHeight: '16px' }}>
                {userPost.postItemName}
              </Text>
              <Point size={5} />
            </>
          )}
          <Text sx={{ fontSize: 14, lineHeight: '16px' }}>
            Draft Saved {dayjs(userPost.created).fromNow()}
          </Text>
        </Group>
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
