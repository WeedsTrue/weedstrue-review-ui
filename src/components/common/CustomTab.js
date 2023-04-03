import React from 'react';
import { Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';

const CustomTab = ({ value, label, isSelected, onTabChange }) => {
  return (
    <Stack
      onClick={() => onTabChange(value)}
      sx={{
        padding: '5px 10px',
        cursor: 'pointer',
        borderBottom: isSelected ? 'solid dodgerblue 3px' : 'none',
        boxSizing: 'border-box',
        height: 35
      }}
    >
      <Text
        sx={{
          color: isSelected ? 'dodgerblue' : 'black'
        }}
        weight={400}
      >
        {label}
      </Text>
    </Stack>
  );
};

CustomTab.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  onTabChange: PropTypes.func
};

export default CustomTab;
