import React from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import PropTypes from 'prop-types';

const FileDropzone = ({ height, onDrop, onReject, ...rest }) => {
  return (
    <Dropzone
      accept={['image/png', 'image/jpeg']}
      maxSize={3 * 1024 ** 2}
      onDrop={onDrop}
      onReject={onReject}
      {...rest}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: height, pointerEvents: 'none' }}
      >
        <Stack>
          <Text inline>Drag your image here or click to select</Text>
        </Stack>
      </Group>
    </Dropzone>
  );
};

FileDropzone.propTypes = {
  height: PropTypes.number,
  onDrop: PropTypes.func,
  onReject: PropTypes.func
};

export default FileDropzone;
