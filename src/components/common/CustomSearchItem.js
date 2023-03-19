import React from 'react';
import { Avatar, Group, Text } from '@mantine/core';
import PropTypes from 'prop-types';

const CustomSearchItem = React.forwardRef(
  ({ image, label, description, ...rest }, ref) => {
    return (
      <Group noWrap ref={ref} sx={{ padding: 10 }} {...rest}>
        {image && <Avatar src={image} />}

        <div>
          <Text size="sm">{label}</Text>
          {description && (
            <Text opacity={0.65} size="xs">
              {description}
            </Text>
          )}
        </div>
      </Group>
    );
  }
);

CustomSearchItem.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  label: PropTypes.string
};

export default CustomSearchItem;
