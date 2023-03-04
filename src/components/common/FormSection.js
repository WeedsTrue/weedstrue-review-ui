import React from 'react';
import { Button, Divider, Group, Stack } from '@mantine/core';
import PropTypes from 'prop-types';

const FormSection = ({
  onSubmit,
  submitTitle,
  onCancel,
  cancelTitle,
  hideButtons,
  children,
  ...rest
}) => {
  return (
    <Stack
      component="form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}
      {...rest}
      sx={{ gap: 20, ...rest.sx }}
    >
      {children}
      {!hideButtons && (
        <>
          <Divider />
          <Group>
            <Button onCancel={onCancel}>{cancelTitle ?? 'Cancel'}</Button>
            <Button>{submitTitle ?? 'submit'}</Button>
          </Group>
        </>
      )}
    </Stack>
  );
};

FormSection.propTypes = {
  cancelTitle: PropTypes.func,
  children: PropTypes.any,
  hideButtons: PropTypes.bool,
  submitTitle: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default FormSection;
