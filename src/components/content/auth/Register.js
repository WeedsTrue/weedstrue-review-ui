import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import FormSection from '../../common/FormSection';

const Register = ({ onModalViewChange }) => {
  const { state, signUp } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: state.username,
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    passwordError: '',
    isLoading: false
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
        <Title order={3}>Sign up</Title>
      </Stack>
      <FormSection
        hideButtons
        onSubmit={() => {
          if (!checkPasswordErrors()) {
            setFormState({
              ...formState,
              isLoading: true
            });
            signUp(
              formState,
              () => {
                onModalViewChange('confirm-code');
              },
              message => {
                setFormState({
                  ...formState,
                  error: message,
                  isLoading: false
                });
              }
            );
          }
        }}
        sx={{ gap: 10 }}
      >
        <TextInput
          disabled={formState.isLoading}
          onChange={e =>
            setFormState({
              ...formState,
              username: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="Username"
          required
          value={formState.username}
        />
        <TextInput
          disabled={formState.isLoading}
          onChange={e =>
            setFormState({
              ...formState,
              email: e.currentTarget.value,
              error: '',
              passwordError: ''
            })
          }
          placeholder="Email"
          required
          type="email"
          value={formState.email}
        />
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
          Already have an account?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('login')}
            sx={{ cursor: 'pointer' }}
          >
            Log In
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

Register.propTypes = {
  onModalViewChange: PropTypes.func
};

export default Register;
