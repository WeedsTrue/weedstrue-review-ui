import React from 'react';
import { Modal } from '@mantine/core';
import PropTypes from 'prop-types';

const ResponsiveModal = ({ children, ...rest }) => {
  return <Modal {...rest}>{children}</Modal>;
};

ResponsiveModal.propTypes = {
  cancelTitle: PropTypes.func,
  children: PropTypes.any,
  hideButtons: PropTypes.bool,
  submitTitle: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ResponsiveModal;
