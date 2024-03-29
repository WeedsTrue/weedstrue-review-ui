import React, { useContext, useRef, useState } from 'react';
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import dayjs from 'dayjs';
import { mq } from '../config/theme';
import { Context as AuthContext } from '../providers/AuthProvider';

const AgeVerificationView = () => {
  const dayInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const { confirmAgeRequirements } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    month: '',
    day: '',
    year: '',
    error: ''
  });

  const verifyAge = () => {
    const userDob = new Date(formState.year, formState.month, formState.day);
    const userAge = dayjs().diff(userDob, 'y');
    if (formState.year.length !== 4 || userAge > 100 || userDob > new Date()) {
      setFormState({
        ...formState,
        error: 'Please enter a valid date'
      });
    } else if (userAge < 19) {
      setFormState({
        ...formState,
        error:
          'Unfortunately, you need to be over the age of 19 to access this website.'
      });
    } else {
      confirmAgeRequirements();
    }
  };

  return (
    <Stack
      sx={{
        margin: 'auto',
        width: '100%',
        maxWidth: 900,
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <Card
        style={{ padding: 0 }}
        sx={mq({ flex: [1, 1, 'unset'], display: 'flex' })}
      >
        <Stack
          sx={mq({
            flex: 1,
            textAlign: 'center',
            gap: [15, 30],
            padding: [20, 40]
          })}
        >
          <Title order={1}>Welcome to WeedsTrue</Title>
          <Text>
            Ontario's one stop shop for information on all your government
            cannabis products and brands
          </Text>
          <Text size={18} weight={500}>
            This website is intended for those who are 19 years of age or older.
          </Text>
          <Stack
            component={'form'}
            onSubmit={e => {
              e.preventDefault();
              verifyAge();
            }}
            sx={mq({ gap: [10, 30] })}
          >
            <Stack sx={{ gap: 10 }}>
              <Text>
                Please enter your birth date to confirm you are of age
              </Text>
              <Group
                sx={mq({
                  flexWrap: ['wrap', 'nowrap', 'nowrap'],
                  margin: 'auto'
                })}
              >
                <TextInput
                  onChange={e => {
                    const inputValue = e.currentTarget.value
                      .replace(/\D/g, '')
                      .substring(0, 2);
                    setFormState({
                      ...formState,
                      month: inputValue
                    });
                    if (inputValue.length === 2) {
                      dayInputRef.current.focus();
                    }
                  }}
                  placeholder="MM"
                  sx={mq({
                    width: ['100%', 'unset', 'unset'],
                    input: { textAlign: 'center' }
                  })}
                  value={formState.month}
                />
                <TextInput
                  onChange={e => {
                    const inputValue = e.currentTarget.value
                      .replace(/\D/g, '')
                      .substring(0, 2);
                    setFormState({
                      ...formState,
                      day: inputValue
                    });
                    if (inputValue.length === 2) {
                      yearInputRef.current.focus();
                    }
                  }}
                  placeholder="DD"
                  ref={dayInputRef}
                  sx={mq({
                    width: ['100%', 'unset', 'unset'],
                    input: { textAlign: 'center' }
                  })}
                  value={formState.day}
                />
                <TextInput
                  onChange={e =>
                    setFormState({
                      ...formState,
                      year: e.currentTarget.value
                        .replace(/\D/g, '')
                        .substring(0, 4)
                    })
                  }
                  placeholder="YYYY"
                  ref={yearInputRef}
                  sx={mq({
                    width: ['100%', 'unset', 'unset'],
                    input: { textAlign: 'center' }
                  })}
                  value={formState.year}
                />
              </Group>
              {formState.error && <Text color="red">{formState.error}</Text>}
            </Stack>
            <Button
              disabled={!formState.month || !formState.day || !formState.year}
              sx={mq({
                margin: 'auto',
                width: '100%',
                maxWidth: ['unset', 250],
                marginTop: 10
              })}
              type="submit"
              variant="filled"
            >
              Verify
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default AgeVerificationView;
