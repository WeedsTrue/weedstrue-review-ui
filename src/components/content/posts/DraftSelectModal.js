import React, { useContext } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Text
} from '@mantine/core';
import PropTypes from 'prop-types';
import { X } from 'tabler-icons-react';
import DraftSelectItem from './DraftSelectItem';
import penAndPaperImage from '../../../images/pen-paper.png';
import ResponsiveModal from '../../common/ResponsiveModal';

const DraftSelectModal = ({
  selectUserPost,
  userPosts,
  onClose,
  isOpen,
  onSelect,
  onDelete
}) => {
  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={isOpen}
      size={600}
      style={{ padding: 0 }}
      styles={{
        modal: {
          padding: '0px !important'
        }
      }}
      transitionDuration={0}
      withCloseButton={false}
    >
      <Stack sx={{ gap: 0 }}>
        <Group
          sx={{
            gap: 10,
            padding: '12px 16px',
            justifyContent: 'space-between'
          }}
        >
          <Group sx={{ gap: 10 }}>
            <Text weight={500}>Drafts</Text>
            <Text color="gray">{userPosts.length}/5</Text>
          </Group>
          <ActionIcon onClick={onClose}>
            <X />
          </ActionIcon>
        </Group>
        <Divider />

        <Stack sx={{ gap: 0, minHeight: 250 }}>
          {userPosts.length === 0 ? (
            <Stack sx={{ textAlign: 'center', margin: 'auto' }}>
              <Image fit="contain" height={125} src={penAndPaperImage} />
              <Text sx={{ fontSize: 16 }} weight={400}>
                Your drafts will show here
              </Text>
            </Stack>
          ) : (
            userPosts.map(p => (
              <React.Fragment key={p.pkUserPost}>
                <DraftSelectItem
                  isBeingEdited={p.pkUserPost === selectUserPost?.pkUserPost}
                  onDelete={onDelete}
                  onSelect={onSelect}
                  userPost={p}
                />
                <Divider />
              </React.Fragment>
            ))
          )}
        </Stack>
        <Divider />
        <Group sx={{ padding: '12px 16px', justifyContent: 'end' }}>
          <Button
            onClick={onClose}
            radius="xl"
            size="sm"
            styles={{ label: { padding: '0px 10px' } }}
            variant="outline"
          >
            Close
          </Button>
        </Group>
      </Stack>
    </ResponsiveModal>
  );
};

DraftSelectModal.propTypes = {
  isOpen: PropTypes.bool,
  selectUserPost: PropTypes.object,
  userPosts: PropTypes.array,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

export default DraftSelectModal;
