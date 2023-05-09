import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import FormSection from '../../common/FormSection';

const ForgotPasswordConfirm = ({ onModalViewChange }) => {
  const { state, resetPassword } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    code: '',
    username: state.username,
    password: '',
    confirmPassword: '',
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
        <Title order={3}>Forgot Password</Title>
      </Stack>
      <FormSection
        hideButtons
        onSubmit={() => {
          setFormState({ ...formState, isLoading: true, error: '' });
          resetPassword(
            {
              username: state.username ? state.username : formState.username,
              code: formState.code,
              newPassword: formState.password
            },
            () => {
              triggerNotification('Password Reset!', 'Success', 'green');
              onModalViewChange('login');
            },
            message =>
              setFormState({ ...formState, isLoading: false, error: message })
          );
        }}
        sx={{ gap: 10 }}
      >
        <TextInput
          disabled={formState.isLoading}
          onChange={e =>
            setFormState({
              ...formState,
              code: e.currentTarget.value,
              passwordError: '',
              error: ''
            })
          }
          placeholder="Code"
          required
          value={formState.code}
        />
        {!state.username && (
          <TextInput
            disabled={formState.isLoading}
            onChange={e =>
              setFormState({
                ...formState,
                username: e.currentTarget.value,
                passwordError: '',
                error: ''
              })
            }
            placeholder="Username"
            required
            value={formState.username}
          />
        )}
        <TextInput
          disabled={formState.isLoading}
          error={!!formState.passwordError}
          onBlur={checkPasswordErrors}
          onChange={e =>
            setFormState({
              ...formState,
              password: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="Password"
          required
          type="password"
          value={formState.password}
        />
        <TextInput
          disabled={formState.isLoading}
          error={formState.passwordError}
          onBlur={checkPasswordErrors}
          onChange={e =>
            setFormState({
              ...formState,
              confirmPassword: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="Confirm Password"
          required
          type="password"
          value={formState.confirmPassword}
        />
        <Button loading={formState.isLoading} type="submit">
          Continue
        </Button>

        <Text size={13} sx={{ marginTop: 10 }}>
          Remember your password?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('login')}
            sx={{ cursor: 'pointer' }}
          >
            Log in
          </Text>
        </Text>

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

ForgotPasswordConfirm.propTypes = {
  onModalViewChange: PropTypes.func
};

export default ForgotPasswordConfirm;
