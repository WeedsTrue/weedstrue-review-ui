import React, { useContext, useEffect, useState } from 'react';
import { ActionIcon, Group, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { X } from 'tabler-icons-react';
import ConfirmAccount from './ConfirmAccount';
import ConfirmAccountResend from './ConfirmAccountResend';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordConfirm from './ForgotPasswordConfirm';
import Login from './Login';
import Register from './Register';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const AuthModal = ({ defaultView }) => {
  const { state, toggleAuthModal } = useContext(AuthContext);
  const [modalState, setModalState] = useState({
    view: 'login'
  });

  useEffect(() => {
    if (state.showAuthModal) {
      setModalState({ view: 'login' });
    }
  }, [state.showAuthModal]);

  return (
    <ResponsiveModal
      centered
      noHeader
      onClose={() => toggleAuthModal(false)}
      opened={state.showAuthModal}
      size={400}
    >
      <Stack
        sx={mq({
          gap: 0,
          display: ['flex', 'flex', 'none']
        })}
      >
        <Group
          sx={{
            minWidth: 100,
            gap: 10,
            padding: '12px 16px',
            placeItems: 'end',
            justifyContent: 'space-between'
          }}
        >
          <Stack style={{ flex: 1 }}></Stack>
          <ActionIcon onClick={() => toggleAuthModal(false)}>
            <X />
          </ActionIcon>
        </Group>
      </Stack>
      <Stack
        sx={{
          maxWidth: 450,
          alignSelf: 'center',
          width: '100%'
        }}
      >
        <Stack
          sx={mq({
            padding: [20, 20, 60]
          })}
        >
          {modalState.view === 'login' ? (
            <Login
              onModalViewChange={view => setModalState({ ...modalState, view })}
            />
          ) : modalState.view === 'register' ? (
            <Register
              onModalViewChange={view => setModalState({ ...modalState, view })}
            />
          ) : modalState.view === 'forgot-password' ? (
            <ForgotPassword
              onModalViewChange={view => setModalState({ ...modalState, view })}
            />
          ) : modalState.view === 'forgot-password-confirm' ? (
            <ForgotPasswordConfirm
              onModalViewChange={view => setModalState({ ...modalState, view })}
            />
          ) : modalState.view === 'confirm-code' ? (
            <ConfirmAccount
              onModalViewChange={view => setModalState({ ...modalState, view })}
            />
          ) : modalState.view === 'confirm-resend' ? (
            <ConfirmAccountResend
              onModalViewChange={view => setModalState({ ...modalState, view })}
            />
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </ResponsiveModal>
  );
};

AuthModal.propTypes = {
  defaultView: PropTypes.string
};

export default AuthModal;
