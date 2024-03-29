import React from 'react';
import {
  Accordion,
  Button,
  Checkbox,
  Grid,
  Group,
  Rating,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { Feather } from 'tabler-icons-react';
import { USER_POST_EFFECT_TYPE } from '../../../config/effectConstants';

const CreatePostReviewAdditions = ({
  postReviewState,
  onPostReviewStateChange,
  postType
}) => {
  const onEffectChange = effect => {
    let newEffectsState = [...postReviewState.effects];
    if (newEffectsState.findIndex(e => e.value === effect.value) !== -1) {
      newEffectsState = newEffectsState.filter(e => e.value !== effect.value);
    } else {
      const hasThreeSelectedAlready = newEffectsState.filter(
        e => e.description === effect.description
      ).length;
      if (hasThreeSelectedAlready < 3) {
        newEffectsState.push(effect);
      }
    }

    onPostReviewStateChange({
      ...postReviewState,
      effects: newEffectsState
    });
  };

  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Text weight={500}>Overall Rating</Text>
        <Rating
          onChange={rating =>
            onPostReviewStateChange({
              ...postReviewState,
              rating
            })
          }
          size="xl"
          value={postReviewState.rating}
        />
      </Stack>
      {postType === 'product' && (
        <Accordion defaultValue={['attributes']} multiple variant="contained">
          <Accordion.Item value="attributes">
            <Accordion.Control>
              <Group sx={{ gap: 10 }}>
                <Text weight={500}>Attributes</Text>
                <Text color="grey" sx={{ fontSize: 12 }}>
                  (Optional)
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack sx={{ gap: 10 }}>
                <Group sx={{ flex: 1 }}>
                  <NumericFormat
                    allowNegative={false}
                    customInput={TextInput}
                    decimalScale={2}
                    label="THC %"
                    onValueChange={e => {
                      if (e.value !== postReviewState.attributes.thc) {
                        onPostReviewStateChange({
                          ...postReviewState,
                          attributes: {
                            ...postReviewState.attributes,
                            thc: e.floatValue
                          }
                        });
                      }
                    }}
                    placeholder="18%"
                    suffix="%"
                    sx={{ flex: 1 }}
                    value={postReviewState.attributes.thc}
                  />
                  <NumericFormat
                    allowNegative={false}
                    customInput={TextInput}
                    decimalScale={2}
                    label="CBD %"
                    onValueChange={e => {
                      if (e.value !== postReviewState.attributes.cbd) {
                        onPostReviewStateChange({
                          ...postReviewState,
                          attributes: {
                            ...postReviewState.attributes,
                            cbd: e.floatValue
                          }
                        });
                      }
                    }}
                    placeholder="0.1%"
                    suffix="%"
                    sx={{ flex: 1 }}
                    value={postReviewState.attributes.cbd}
                  />
                </Group>

                <Group sx={{ flex: 1 }}>
                  <NumericFormat
                    allowNegative={false}
                    customInput={TextInput}
                    decimalScale={2}
                    label="TERP %"
                    onValueChange={e => {
                      if (e.value !== postReviewState.attributes.terps) {
                        onPostReviewStateChange({
                          ...postReviewState,
                          attributes: {
                            ...postReviewState.attributes,
                            terps: e.floatValue
                          }
                        });
                      }
                    }}
                    placeholder="3.11%"
                    suffix="%"
                    sx={{ flex: 1 }}
                    value={postReviewState.attributes.terps}
                  />
                  <DateInput
                    label="Packaged Dated"
                    max={new Date()}
                    onChange={value =>
                      onPostReviewStateChange({
                        ...postReviewState,
                        attributes: {
                          ...postReviewState.attributes,
                          packagedDate: value.toISOString()
                        }
                      })
                    }
                    placeholder="December 27, 2022"
                    sx={{ flex: 1 }}
                    value={
                      postReviewState.attributes.packagedDate
                        ? new Date(postReviewState.attributes.packagedDate)
                        : null
                    }
                  />
                </Group>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="feeling">
            <Accordion.Control>
              <Group sx={{ gap: 10 }}>
                <Text weight={500}>Which effects did you feel?</Text>

                <Text color="grey" sx={{ fontSize: 12 }}>
                  (Select up to 3)
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid gutter={10}>
                {USER_POST_EFFECT_TYPE.filter(
                  e => e.description === 'FEELING'
                ).map(e => {
                  const isSelected =
                    postReviewState.effects.findIndex(
                      s => s.value === e.value
                    ) !== -1;
                  return (
                    <Grid.Col key={e.value} lg={2} md={3} sm={4} xl={2} xs={6}>
                      <Button
                        color="dark"
                        key={e.value}
                        onClick={() => onEffectChange(e)}
                        size="lg"
                        sx={{ width: '100%', padding: 0 }}
                        variant={isSelected ? 'filled' : 'outline'}
                      >
                        <Stack sx={{ gap: 0, placeItems: 'center' }}>
                          {<e.icon />}
                          <Text sx={{ fontSize: 12 }}>{e.label}</Text>
                        </Stack>
                      </Button>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="smell">
            <Accordion.Control>
              <Group sx={{ gap: 10 }}>
                <Text weight={500}>Describe the flavor & smell</Text>
                <Text color="grey" sx={{ fontSize: 12 }}>
                  (Select up to 3)
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid gutter={10}>
                {USER_POST_EFFECT_TYPE.filter(
                  e => e.description === 'SMELL'
                ).map(e => {
                  const isSelected =
                    postReviewState.effects.findIndex(
                      s => s.value === e.value
                    ) !== -1;
                  return (
                    <Grid.Col key={e.value} lg={2} md={3} sm={4} xl={2} xs={6}>
                      <Button
                        color="dark"
                        key={e.value}
                        onClick={() => onEffectChange(e)}
                        size="lg"
                        sx={{ width: '100%', padding: 0 }}
                        variant={isSelected ? 'filled' : 'outline'}
                      >
                        <Stack sx={{ gap: 0, placeItems: 'center' }}>
                          {<e.icon />}
                          <Text sx={{ fontSize: 12 }}>{e.label}</Text>
                        </Stack>
                      </Button>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="aid">
            <Accordion.Control>
              <Group sx={{ gap: 10 }}>
                <Text weight={500}>Helps with?</Text>
                <Text color="grey" sx={{ fontSize: 12 }}>
                  (Select up to 3)
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid gutter={10}>
                {USER_POST_EFFECT_TYPE.filter(e => e.description === 'AID').map(
                  e => {
                    const isSelected =
                      postReviewState.effects.findIndex(
                        s => s.value === e.value
                      ) !== -1;
                    return (
                      <Grid.Col
                        key={e.value}
                        lg={4}
                        md={4}
                        sm={4}
                        xl={4}
                        xs={6}
                      >
                        <Checkbox
                          checked={isSelected}
                          label={e.label}
                          onChange={() => onEffectChange(e)}
                        />
                      </Grid.Col>
                    );
                  }
                )}
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
    </Stack>
  );
};

CreatePostReviewAdditions.propTypes = {
  postReviewState: PropTypes.object,
  postType: PropTypes.string,
  onPostReviewStateChange: PropTypes.func
};

export default CreatePostReviewAdditions;
