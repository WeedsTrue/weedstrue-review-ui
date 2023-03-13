import React from 'react';
import { Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { PRODUCT_ATTRIBUTE_TYPE } from '../../../config/constants';

const ProductAttribute = ({ attribute }) => {
  const attributeType = PRODUCT_ATTRIBUTE_TYPE.find(
    t => t.value === attribute.fkProductAttributeType
  );

  return (
    <Stack>
      <Text size={14} weight={500}>
        {attributeType.displayLabel}{' '}
        {attributeType.displayType === 'percentage' ? (
          <NumericFormat
            allowNegative={false}
            decimalScale={2}
            displayType="text"
            label="THC %"
            suffix="%"
            value={attribute.value}
          />
        ) : (
          attributeType.displayType === 'date' &&
          dayjs(attribute.value).format('MMMM D, YYYY')
        )}
      </Text>
    </Stack>
  );
};

ProductAttribute.propTypes = {
  attribute: PropTypes.object
};

export default ProductAttribute;
