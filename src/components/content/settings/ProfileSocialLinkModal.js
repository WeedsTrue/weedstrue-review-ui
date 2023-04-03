import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { USER_SOCIAL_LINK_TYPES } from '../../../config/constants';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const ProfileSocialLinkModal = ({
  opened,
  onClose,
  socialLink,
  onAdd,
  onRemove,
  showDelete
}) => {
  const {} = useContext(ReviewsContext);
  const [formState, setFormState] = useState({
    fkUserSocialLinkType: '',
    displayText: '',
    websiteUrl: '',
    isLoading: false
  });

  const selectedSocialLinkType = USER_SOCIAL_LINK_TYPES.find(
    t => t.value === formState.fkUserSocialLinkType
  );

  useEffect(() => {
    if (opened) {
      if (socialLink) {
        setFormState({
          pkUserSocialLink: socialLink.pkUserSocialLink,
          fkUserSocialLinkType: socialLink.fkUserSocialLinkType,
          displayText: socialLink.displayText,
          websiteUrl: socialLink.websiteUrl,
          isLoading: false
        });
      } else {
        setFormState({
          pkUserSocialLink: `temp-${new Date().getTime()}`,
          fkUserSocialLinkType: '',
          displayText: '',
          websiteUrl: '',
          isLoading: false
        });
      }
    }
  }, [opened]);

  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={opened}
      size={550}
      title={
        <Title order={3}>
          {showDelete ? 'Remove' : socialLink ? 'Edit' : 'Add'} Social Link
        </Title>
      }
    >
      {showDelete ? (
        <Stack sx={{ gap: 0 }}>
          <Stack sx={{ padding: 20 }}>
            <Text sx={{ textAlign: 'center' }}>
              Are you sure you want to remove the selected social link?
            </Text>
          </Stack>
          <Divider />
          <Group sx={{ justifyContent: 'center', padding: 20 }}>
            <Button color="dark" onClick={onClose} sx={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                onRemove(socialLink.pkUserSocialLink);
                onClose();
              }}
              sx={{ flex: 1 }}
            >
              Remove
            </Button>
          </Group>
        </Stack>
      ) : !selectedSocialLinkType ? (
        <Stack sx={{ padding: 20 }}>
          <Group>
            {USER_SOCIAL_LINK_TYPES.map(social => (
              <Button
                color="dark"
                key={social.value}
                leftIcon={social.icon}
                onClick={() =>
                  setFormState({
                    ...formState,
                    fkUserSocialLinkType: social.value
                  })
                }
                radius="xl"
                variant="outline"
              >
                {social.label}
              </Button>
            ))}
          </Group>
        </Stack>
      ) : (
        <Stack sx={{ gap: 0 }}>
          <Stack sx={{ padding: 20, gap: 10 }}>
            <Group>
              {
                <Button
                  color="dark"
                  component={'a'}
                  disabled={!formState.websiteUrl}
                  href={formState.websiteUrl}
                  key={selectedSocialLinkType.value}
                  leftIcon={selectedSocialLinkType.icon}
                  onClick={() =>
                    setFormState({
                      ...formState,
                      fkUserSocialLinkType: selectedSocialLinkType.value
                    })
                  }
                  radius="xl"
                  target="_blank"
                  variant="outline"
                >
                  {selectedSocialLinkType.label}
                </Button>
              }
            </Group>
            {selectedSocialLinkType.hasCustomLabel ? (
              <>
                <TextInput
                  onChange={e =>
                    setFormState({
                      ...formState,
                      displayText: e.currentTarget.value.substring(0, 50)
                    })
                  }
                  placeholder="Display text"
                  value={formState.displayText}
                />
                <TextInput
                  onChange={e =>
                    setFormState({
                      ...formState,
                      websiteUrl: e.currentTarget.value.substring(0, 500)
                    })
                  }
                  placeholder={selectedSocialLinkType.placeholder}
                  value={formState.websiteUrl}
                />
              </>
            ) : (
              <>
                <TextInput
                  onChange={e => {
                    const value = e.currentTarget.value;
                    setFormState({
                      ...formState,
                      displayText: value,
                      websiteUrl: `${
                        selectedSocialLinkType.website
                      }${value.replace('@', '')}`
                    });
                  }}
                  placeholder={selectedSocialLinkType.placeholder}
                  value={formState.displayText}
                />
              </>
            )}
          </Stack>
          <Divider />
          <Group sx={{ justifyContent: 'center', padding: 20 }}>
            <Button
              color="dark"
              disabled={formState.isLoading}
              onClick={onClose}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              disabled={!formState.websiteUrl}
              loading={formState.isLoading}
              onClick={() => {
                onAdd(formState);
                onClose();
              }}
              sx={{ flex: 1 }}
            >
              {socialLink ? 'Save Changes' : 'Add'}
            </Button>
          </Group>
        </Stack>
      )}
    </ResponsiveModal>
  );
};

ProfileSocialLinkModal.propTypes = {
  opened: PropTypes.bool,
  showDelete: PropTypes.bool,
  socialLink: PropTypes.object,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  onRemove: PropTypes.func
};

export default ProfileSocialLinkModal;
