import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
  TextInput,
  Textarea
} from '@mantine/core';
import PropTypes from 'prop-types';
import FileDropzone from '../../common/FileDropZone';
import ResponsiveModal from '../../common/ResponsiveModal';

const CreatePostImageModal = ({ postImage, onClose, isOpen, onAdd }) => {
  const imageInputRef = useRef(null);
  const [formState, setFormState] = useState({
    pkUserPostImage: null,
    file: null,
    src: null,
    previewImage: null,
    externalUrl: '',
    description: '',
    deleted: false,
    isLinkExternal: false,
    hasOldImageUploaded: false,
    loading: false
  });

  useEffect(() => {
    if (isOpen) {
      setFormState({
        pkUserPostImage:
          postImage?.pkUserPostImage ?? `temp-${new Date().getTime()}`,
        file: null,
        src: postImage?.isLinkExternal
          ? ''
          : postImage?.previewImage ?? postImage?.src ?? null,
        previewImage: postImage?.previewImage,
        externalUrl: postImage?.isLinkExternal
          ? postImage?.externalUrl ?? postImage?.src
          : postImage?.externalUrl,
        description: postImage?.description ?? '',
        deleted: false,
        isLinkExternal: postImage?.isLinkExternal,
        hasOldImageUploaded: postImage && !postImage.isLinkExternal,
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
          <Text weight={500}> {postImage ? 'Update Image' : 'Add Image'}</Text>
        </Group>
      }
    >
      <Stack sx={{ gap: 10, padding: 20 }}>
        <Group
          sx={{
            justifyContent: 'space-between',
            flex: 1,
            alignSelf: 'stretch'
          }}
        >
          <Tabs
            defaultValue="gallery"
            onTabChange={tab =>
              setFormState({
                ...formState,
                isLinkExternal: tab === 'link'
              })
            }
            sx={{ flex: 1 }}
            value={formState.isLinkExternal ? 'link' : 'upload'}
            variant="outline"
          >
            <Tabs.List>
              <Tabs.Tab value="upload">Upload</Tabs.Tab>
              <Tabs.Tab value="link">Link</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Group>
        {!formState.isLinkExternal &&
        !formState.src &&
        !formState.previewImage ? (
          <FileDropzone height={250} onDrop={files => onImageDrop(files[0])} />
        ) : (
          <Stack sx={{ gap: 10, position: 'relative' }}>
            {formState.isLinkExternal ? (
              <>
                {formState.externalUrl && (
                  <Image
                    fit="contain"
                    height={250}
                    src={formState.externalUrl}
                  />
                )}
              </>
            ) : (
              <>
                <Image
                  fit="contain"
                  height={250}
                  src={formState.previewImage ?? formState.src}
                />
                <Button
                  compact
                  onClick={() => imageInputRef.current.click()}
                  sx={{ position: 'absolute', right: 0, top: 10 }}
                >
                  Change Image
                </Button>
              </>
            )}

            <input
              accept={['image/png', 'image/jpeg']}
              hidden
              onChangeCapture={e => onImageDrop(e.target.files[0])}
              ref={imageInputRef}
              type="file"
            />
          </Stack>
        )}

        {formState.isLinkExternal && (
          <TextInput
            onChange={e =>
              setFormState({
                ...formState,
                externalUrl: e.currentTarget.value
              })
            }
            placeholder="Image Url"
            value={formState.externalUrl ?? ''}
          />
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
          disabled={
            formState.isLinkExternal
              ? !formState.externalUrl
              : !formState.previewImage && !formState.src
          }
          onClick={() => onAdd(formState)}
          radius="xl"
          size="sm"
          styles={{ label: { padding: '0px 10px' } }}
        >
          {postImage ? 'Update Image' : 'Add Image'}
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
