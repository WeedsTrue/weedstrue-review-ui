import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import FormSection from '../../common/FormSection';

const ForgotPassword = ({ onModalViewChange }) => {
  const { state, sendPasswordReset } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: state.username,
    isLoading: false,
    error: ''
  });
  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Forgot Password</Title>
      </Stack>
      <FormSection
        hideButtons
        onSubmit={() => {
          setFormState({ ...formState, isLoading: true, error: '' });
          sendPasswordReset(
            formState,
            () => onModalViewChange('forgot-password-confirm'),
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
              username: e.currentTarget.value,
              error: ''
            })
          }
          placeholder="Username"
          required
          value={formState.username}
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

ForgotPassword.propTypes = {
  onModalViewChange: PropTypes.func
};

export default ForgotPassword;
