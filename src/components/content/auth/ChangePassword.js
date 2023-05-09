import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import FormSection from '../../common/FormSection';

const ChangePassword = ({ onModalViewChange }) => {
  const { state, changePassword } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    isLoading: false,
    passwordError: '',
    error: ''
  });

  const checkPasswordErrors = () => {
    if (formState.password) {
      if (
        formState.confirmPassword &&
        formState.confirmPassword !== formState.password
      ) {
        setFormState({
          ...formState,
          passwordError: 'Passwords do not match'
        });
        return true;
      } else if (formState.password.length < 8) {
        setFormState({
          ...formState,
          passwordError: 'Password must be 8 or more characters long'
        });
        return true;
      }
    }
    return false;
  };

  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Change Password</Title>
      </Stack>
      <FormSection
        hideButtons
        onSubmit={() => {
          setFormState({ ...formState, isLoading: true, error: '' });
          changePassword(
            formState,
            () => {},
            message =>
              setFormState({ ...formState, isLoading: false, error: message })
          );
        }}
        sx={{ gap: 10 }}
      >
        <TextInput
          disabled={formState.isLoading}
          error={!!formState.passwordError}
          onBlur={checkPasswordErrors}
          onChange={e =>
            setFormState({
              ...formState,
              oldPassword: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="Old Password"
          required
          type="password"
          value={formState.oldPassword}
        />
        <TextInput
          disabled={formState.isLoading}
          error={!!formState.passwordError}
          onBlur={checkPasswordErrors}
          onChange={e =>
            setFormState({
              ...formState,
              newPassword: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="New Password"
          required
          type="password"
          value={formState.newPassword}
        />
        <TextInput
          disabled={formState.isLoading}
          error={formState.passwordError}
          onBlur={checkPasswordErrors}
          onChange={e =>
            setFormState({
              ...formState,
              confirmNewPassword: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="Confirm New Password"
          required
          type="password"
          value={formState.confirmNewPassword}
        />
        <Button loading={formState.isLoading} type="submit">
          Change Password
        </Button>

        {formState.error && (
          <Alert
            color="red"
            icon={<AlertCircle />}
            sx={{ marginTop: 10 }}
            variant={'outline'}
          >
            <Text weight={500}>{formState.error}</Text>
          </Alert>
        )}
      </FormSection>
    </Stack>
  );
};

ChangePassword.propTypes = {
  onModalViewChange: PropTypes.func
};

export default ChangePassword;
