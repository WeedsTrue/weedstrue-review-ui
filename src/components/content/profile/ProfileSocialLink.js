import React from 'react';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { ChevronRight, Edit, Trash } from 'tabler-icons-react';
import { USER_SOCIAL_LINK_TYPES } from '../../../config/constants';

const ProfileSocialLink = ({ socialLink, onEdit, onRemove }) => {
  const socialLinkType = USER_SOCIAL_LINK_TYPES.find(
    v => v.value === socialLink.fkUserSocialLinkType
  );
  return (
    <Group
      component={!onEdit ? 'a' : null}
      href={socialLink.websiteUrl}
      key={socialLink.pkUserSocialLink}
      sx={{
        border: 'solid 1px lightgrey',
        padding: 10,
        flex: 1,
        flexWrap: 'nowrap',
        color: 'black',
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: '#fafafa'
        }
      }}
      target="_blank"
    >
      <Group style={{ flex: 1, gap: 10 }}>
        {socialLinkType.icon}
        <Stack sx={{ gap: 0 }}>
          <Text sx={{ lineHeight: '16px' }} weight={500}>
            {socialLinkType.label}
          </Text>
          <Text color="grey" size={14} sx={{ lineHeight: '16px' }}>
            {socialLink.displayText}
          </Text>
        </Stack>
      </Group>
      {onEdit ? (
        <Group sx={{ gap: 10 }}>
          <ActionIcon color="dark" onClick={onEdit}>
            <Edit />
          </ActionIcon>
          <ActionIcon color="dark" onClick={onRemove}>
            <Trash />
          </ActionIcon>
        </Group>
      ) : (
        <Group sx={{ gap: 10 }}>
          <ChevronRight />
        </Group>
      )}
    </Group>
  );
};

ProfileSocialLink.propTypes = {
  socialLink: PropTypes.object,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};

export default ProfileSocialLink;
