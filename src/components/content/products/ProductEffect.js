import React from 'react';
import { Badge } from '@mantine/core';
import PropTypes from 'prop-types';
import { USER_POST_EFFECT_TYPE } from '../../../config/effectConstants';

const ProductEffect = ({ fkProductEffectType }) => {
  const effectType = USER_POST_EFFECT_TYPE.find(
    t => t.value === fkProductEffectType
  );
  return (
    <Badge
      color={
        effectType.description === 'FEELING'
          ? 'green'
          : effectType.description === 'AID'
          ? 'blue'
          : 'dark'
      }
      leftSection={<effectType.icon size={20} style={{ paddingTop: 7 }} />}
      size="lg"
      variant="outline"
    >
      {effectType.label}
    </Badge>
  );
};

ProductEffect.propTypes = {
  fkProductEffectType: PropTypes.number
};

export default ProductEffect;
