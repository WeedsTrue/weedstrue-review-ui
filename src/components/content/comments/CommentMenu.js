import React, { useContext } from 'react';
import { Button, Menu } from '@mantine/core';
import PropTypes from 'prop-types';
import { Dots } from 'tabler-icons-react';
import { mq } from '../../../config/theme';
import { Context as AuthContext } from '../../../providers/AuthProvider';

const CommentMenu = ({ comment, onAction }) => {
  const { state } = useContext(AuthContext);

  return (
    <Menu shadow="md" width={200} withArrow>
      <Menu.Target>
        <Button
          color="dark"
          onClick={e => e.preventDefault()}
          size="xs"
          sx={{ padding: 3 }}
          variant="subtle"
        >
          <Dots />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={e => {
            e.preventDefault();
            onAction('SHARE');
          }}
          sx={mq({ display: ['flex', 'flex', 'none'] })}
        >
          Share
        </Menu.Item>
        {state.userData?.pkUser === comment?.user.pkUser ? (
          <>
            <Menu.Item
              onClick={e => {
                e.preventDefault();
                onAction('EDIT');
              }}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={e => {
                e.preventDefault();
                onAction('DELETE');
              }}
            >
              Delete
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            onClick={e => {
              e.preventDefault();
              onAction('REPORT');
            }}
          >
            Report
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

CommentMenu.propTypes = {
  comment: PropTypes.object,
  onAction: PropTypes.func
};

export default CommentMenu;
