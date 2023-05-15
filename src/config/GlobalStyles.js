import React from 'react';
import { Global } from '@mantine/core';

const GlobalStyles = () => {
  return (
    <Global
      styles={theme => ({
        'html, body, #root': {
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          backgroundColor: '#e6e6e7'
        },
        '.mantine-AppShell-body, .mantine-AppShell-main': {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          flex: 1,
          paddingBottom: 0
        },
        '.mantine-Select-itemsWrapper, 	.mantine-MultiSelect-itemsWrapper': {
          padding: '0px'
        }
      })}
    />
  );
};

export default GlobalStyles;
