import React from 'react';
import { Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import PropTypes from 'prop-types';
import { Photo, Upload, X } from 'tabler-icons-react';

const FileDropzone = ({ height, ...rest }) => {
  const theme = useMantineTheme();

  return (
    <Dropzone
      accept={['image/png', 'image/jpeg']}
      maxSize={3 * 1024 ** 2}
      onDrop={files => console.log('accepted files', files)}
      onReject={files => console.log('rejected files', files)}
      {...rest}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: height, pointerEvents: 'none' }}
      >
        {/* <Dropzone.Accept>
          <Upload
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === 'dark' ? 4 : 6
              ]
            }
            size="3.2rem"
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <X
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            size="3.2rem"
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Photo size="3.2rem" stroke={1.5} />
        </Dropzone.Idle> */}

        <Stack>
          <Text inline>Drag images here or click to select files</Text>
        </Stack>
      </Group>
    </Dropzone>
  );
};

FileDropzone.propTypes = {
  height: PropTypes.number
};

export default FileDropzone;
