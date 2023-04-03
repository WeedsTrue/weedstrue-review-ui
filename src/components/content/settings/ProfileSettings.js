import React, { useContext, useEffect, useState } from 'react';
import { Button, Group, Stack, Text, Textarea, Title } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import ProfileSocialLinkModal from './ProfileSocialLinkModal';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import FileDropzone from '../../common/FileDropZone';
import ProfileSocialLink from '../profile/ProfileSocialLink';

const ProfileSettings = () => {
  const { state, updateUserProfile } = useContext(AuthContext);
  const [socialLinkModalState, setSocialLinkModalState] = useState({
    isOpen: false,
    userSocialLink: null,
    showDelete: false
  });
  const [formState, setFormState] = useState({
    avatar: state.userData?.avatar,
    bio: state.userData?.bio,
    userSocialLinks: [],
    hasChanges: false,
    isLoading: false
  });
  const bioCharactersRemaining = 200 - formState.bio?.length;

  useEffect(() => {
    setFormState({
      avatar: state.userData?.avatar,
      bio: state.userData?.bio ?? '',
      userSocialLinks: state.userData?.userSocialLinks,
      hasChanges: false,
      isLoading: false
    });
  }, []);

  return (
    <Stack sx={{ gap: 40 }}>
      <Stack sx={{ gap: 20, flex: 1, maxWidth: 768 }}>
        <Group sx={{ justifyContent: 'space-between' }}>
          <Title order={4} sx={{ minHeight: 36 }}>
            Profile Settings
          </Title>
          {formState.hasChanges && (
            <Group>
              <Button
                color="dark"
                disabled={formState.isLoading}
                onClick={() => {
                  setFormState({
                    avatar: state.userData?.avatar,
                    bio: state.userData?.bio ?? '',
                    userSocialLinks: state.userData?.userSocialLinks,
                    hasChanges: false,
                    isLoading: false
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                loading={formState.isLoading}
                onClick={() => {
                  setFormState({
                    ...formState,
                    isLoading: true
                  });

                  updateUserProfile(
                    {
                      ...formState,
                      userSocialLinks: formState.userSocialLinks.map(s => ({
                        ...s,
                        pkUserSocialLink:
                          typeof s.pkUserSocialLink === 'string'
                            ? null
                            : s.pkUserSocialLink
                      }))
                    },
                    () => {
                      setFormState({
                        ...formState,
                        isLoading: false,
                        hasChanges: false
                      });
                      triggerNotification(
                        'Profile Updated!',
                        'Success',
                        'green'
                      );
                    },
                    message => {
                      setFormState({
                        ...formState,
                        isLoading: false
                      });
                      triggerNotification(message);
                    }
                  );
                }}
              >
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
            <FileDropzone height={100} />
          </Stack>
        </Group>

        <Group sx={{ justifyContent: 'space-between' }}>
          <Stack style={{ gap: 3, flex: 1 }}>
            <Textarea
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
