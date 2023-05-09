import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  Title
} from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import ProfileSocialLinkModal from './ProfileSocialLinkModal';
import { mq } from '../../../config/theme';
import {
  deleteFileFromStorage,
  uploadFileToStorage
} from '../../../helpers/awsHelper';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import ProfileSocialLink from '../profile/ProfileSocialLink';

const ProfileSettings = () => {
  const avatarInputRef = useRef(false);
  const { state, updateUserProfile } = useContext(AuthContext);
  const [socialLinkModalState, setSocialLinkModalState] = useState({
    isOpen: false,
    userSocialLink: null,
    showDelete: false
  });
  const [formState, setFormState] = useState({
    avatar: state.userData?.avatar ?? '',
    avatarFile: null,
    avatarPreview: null,
    bio: state.userData?.bio ?? '',
    userSocialLinks: state.userData?.userSocialLinks ?? [],
    hasChanges: false,
    isLoading: false
  });
  const bioCharactersRemaining = 200 - formState.bio?.length;

  useEffect(() => {
    setFormState({
      avatar: state.userData?.avatar ?? '',
      avatarFile: null,
      avatarPreview: null,
      bio: state.userData?.bio ?? '',
      userSocialLinks: state.userData?.userSocialLinks ?? [],
      hasChanges: false,
      isLoading: false
    });
  }, []);

  const updateProfile = (profileFormState, onSuccessCallback) => {
    updateUserProfile(
      {
        ...profileFormState,
        userSocialLinks: profileFormState.userSocialLinks.map(s => ({
          ...s,
          pkUserSocialLink:
            typeof s.pkUserSocialLink === 'string' ? null : s.pkUserSocialLink
        }))
      },
      () => {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
        setFormState({
          ...profileFormState,
          isLoading: false,
          hasChanges: false
        });
        triggerNotification('Profile Updated!', 'Success', 'green');
      },
      message => {
        setFormState({
          ...profileFormState,
          isLoading: false
        });
        triggerNotification(message);
      }
    );
  };

  const onSaveChanges = () => {
    setFormState({
      ...formState,
      isLoading: true
    });

    if (formState.avatarFile) {
      uploadFileToStorage(
        `user-${state.userData.pkUser}-avatar-${new Date().getTime()}`,
        formState.avatarFile,
        url => {
          updateProfile({ ...formState, avatar: url }, () => {
            if (formState.avatar) {
              deleteFileFromStorage(formState.avatar);
            }
          });
        },
        () => {
          updateProfile(formState);
        }
      );
    } else {
      updateProfile(formState);
    }
  };

  const onCancel = () => {
    setFormState({
      avatar: state.userData?.avatar ?? '',
      avatarFile: null,
      avatarPreview: null,
      bio: state.userData?.bio ?? '',
      userSocialLinks: state.userData?.userSocialLinks ?? [],
      hasChanges: false,
      isLoading: false
    });
  };

  return (
    <Stack sx={{ gap: 20, flex: 1 }}>
      <Stack sx={{ gap: 20, flex: 1, maxWidth: 768 }}>
        <Group sx={{ justifyContent: 'space-between' }}>
          <Title order={4}>Profile Settings</Title>
          {formState.hasChanges && (
            <Group sx={mq({ display: ['none', 'flex'] })}>
              <Button
                color="dark"
                disabled={formState.isLoading}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button loading={formState.isLoading} onClick={onSaveChanges}>
                Save Changes
              </Button>
            </Group>
          )}
        </Group>
        <Group>
          <Stack sx={{ gap: 0 }}>
            <Text weight={500}>Username</Text>
            <Text color="grey" size={14}>
              {state.userData.username}
            </Text>
          </Stack>
        </Group>

        <Group>
          <Stack sx={{ gap: 5, flex: 1, maxWidth: 200 }}>
            <Text weight={500}>Profile Image</Text>
            <Group noWrap sx={{ flex: 1, alignItems: 'end' }}>
              <Avatar
                size={75}
                src={formState.avatarPreview ?? formState.avatar}
              />
              <Button
                compact
                disabled={formState.isLoading}
                onClick={() => avatarInputRef.current.click()}
                size="sm"
              >
                Upload image
              </Button>
              <input
                accept={['image/png', 'image/jpeg']}
                hidden
                onChangeCapture={e => {
                  setFormState({
                    ...formState,
                    avatarPreview: URL.createObjectURL(e.target.files[0]),
                    avatarFile: e.target.files[0],
                    hasChanges: true
                  });
                }}
                ref={avatarInputRef}
                type="file"
              />
            </Group>
          </Stack>
        </Group>

        <Group sx={{ justifyContent: 'space-between' }}>
          <Stack style={{ gap: 3, flex: 1 }}>
            <Textarea
              disabled={formState.isLoading}
              label="Bio"
              minRows={4}
              onChange={e =>
                setFormState({
                  ...formState,
                  bio: e.currentTarget.value.substring(0, 200),
                  hasChanges: true
                })
              }
              placeholder="Bio (optional)"
              sx={{ flex: 1 }}
              value={formState.bio ?? ''}
            />
            <Text
              color={bioCharactersRemaining <= 0 ? 'red' : 'grey'}
              size={12}
              weight={bioCharactersRemaining <= 0 ? 500 : 'normal'}
            >
              {bioCharactersRemaining} Characters remaining
            </Text>
          </Stack>
        </Group>

        <Group sx={{ justifyContent: 'space-between' }}>
          <Stack style={{ gap: 10, flex: 1 }}>
            <Text weight={500}>Social Links (3 Max)</Text>
            {formState.userSocialLinks.length < 3 && (
              <Group>
                <Button
                  disabled={formState.isLoading}
                  leftIcon={<Plus />}
                  onClick={() =>
                    setSocialLinkModalState({
                      isOpen: true,
                      userSocialLink: null,
                      showDelete: false
                    })
                  }
                  radius="xl"
                  variant="outline"
                >
                  Add Social Link
                </Button>
              </Group>
            )}
            <Stack sx={{ marginTop: 5 }}>
              {formState.userSocialLinks.map(socialLink => (
                <ProfileSocialLink
                  key={socialLink.pkUserSocialLink}
                  onEdit={() =>
                    setSocialLinkModalState({
                      isOpen: true,
                      userSocialLink: socialLink,
                      showDelete: false
                    })
                  }
                  onRemove={() =>
                    setSocialLinkModalState({
                      isOpen: true,
                      userSocialLink: socialLink,
                      showDelete: true
                    })
                  }
                  socialLink={socialLink}
                />
              ))}
            </Stack>
          </Stack>
        </Group>

        {formState.hasChanges && (
          <Group sx={mq({ display: ['flex', 'none'], flex: 1 })}>
            <Button
              color="dark"
              disabled={formState.isLoading}
              onClick={onCancel}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              loading={formState.isLoading}
              onClick={onSaveChanges}
              style={{ flex: 1 }}
            >
              Save Changes
            </Button>
          </Group>
        )}
      </Stack>
      <ProfileSocialLinkModal
        onAdd={socialLink => {
          const existingIndex = formState.userSocialLinks.findIndex(
            s => s.pkUserSocialLink === socialLink.pkUserSocialLink
          );
          if (existingIndex !== -1) {
            const socialsCopy = [...formState.userSocialLinks];
            socialsCopy[existingIndex] = socialLink;
            setFormState({
              ...formState,
              userSocialLinks: socialsCopy,
              hasChanges: true
            });
          } else {
            setFormState({
              ...formState,
              userSocialLinks: [...formState.userSocialLinks, socialLink],
              hasChanges: true
            });
          }
        }}
        onClose={() =>
          setSocialLinkModalState({
            ...socialLinkModalState,
            isOpen: false
          })
        }
        onRemove={pkUserSocialLink => {
          setFormState({
            ...formState,
            userSocialLinks: [
              ...formState.userSocialLinks.filter(
                s => s.pkUserSocialLink !== pkUserSocialLink
              )
            ],
            hasChanges: true
          });
        }}
        opened={socialLinkModalState.isOpen}
        showDelete={socialLinkModalState.showDelete}
        socialLink={socialLinkModalState.userSocialLink}
      />
    </Stack>
  );
};

export default ProfileSettings;
