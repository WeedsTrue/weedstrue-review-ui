import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Textarea
} from '@mantine/core';
import PropTypes from 'prop-types';
import FileDropzone from '../../common/FileDropZone';
import ResponsiveModal from '../../common/ResponsiveModal';

const CreatePostImageModal = ({ postImage, onClose, isOpen, onAdd }) => {
  const imageInputRef = useRef(null);
  const [formState, setFormState] = useState({
    file: null,
    src: null,
    previewImage: null,
    description: '',
    deleted: false,
    loading: false
  });

  useEffect(() => {
    if (isOpen) {
      setFormState({
        pkUserPostImage:
          postImage?.pkUserPostImage ?? `temp-${new Date().getTime()}`,
        file: null,
        src: postImage?.previewImage ?? postImage?.src ?? null,
        description: postImage?.description ?? '',
        deleted: false,
        loading: false
      });
    }
  }, [isOpen]);

  const onImageDrop = file => {
    setFormState({
      ...formState,
      file,
      previewImage: URL.createObjectURL(file)
    });
  };

  return (
    <ResponsiveModal
      centered
      lockScroll
      onClose={onClose}
      opened={isOpen}
      size={600}
      title={
        <Group sx={{ gap: 10, flex: 1, flexWrap: 'nowrap' }}>
          <Text weight={500}>Add Image</Text>
        </Group>
      }
    >
      <Stack sx={{ gap: 10, padding: 20 }}>
        {!formState.src && !formState.previewImage ? (
          <FileDropzone height={250} onDrop={files => onImageDrop(files[0])} />
        ) : (
          <Stack sx={{ gap: 10 }}>
            <Stack sx={{ flex: 1, alignItems: 'start' }}>
              <Button compact onClick={() => imageInputRef.current.click()}>
                Change Image
              </Button>
              <input
                accept={['image/png', 'image/jpeg']}
                hidden
                onChangeCapture={e => onImageDrop(e.target.files[0])}
                ref={imageInputRef}
                type="file"
              />
            </Stack>
            <Image
              fit="contain"
              height={250}
              src={formState.previewImage ?? formState.src}
            />
          </Stack>
        )}

        <Textarea
          autosize
          minRows={3}
          onChange={e =>
            setFormState({
              ...formState,
              description: e.currentTarget.value.substring(0, 200),
              hasUnsavedChanges: true
            })
          }
          placeholder="Description (optional)"
          required
          value={formState.description}
        />
      </Stack>
      <Divider />
      <Group sx={{ padding: '12px 16px', justifyContent: 'end' }}>
        <Button
          color="dark"
          onClick={onClose}
          radius="xl"
          size="sm"
          styles={{ label: { padding: '0px 10px' } }}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          disabled={!formState.previewImage && !formState.src}
          onClick={() => onAdd(formState)}
          radius="xl"
          size="sm"
          styles={{ label: { padding: '0px 10px' } }}
        >
          Add Image
        </Button>
      </Group>
    </ResponsiveModal>
  );
};

CreatePostImageModal.propTypes = {
  isOpen: PropTypes.bool,
  postImage: PropTypes.object,
  onAdd: PropTypes.func,
  onClose: PropTypes.func
};

export default CreatePostImageModal;
