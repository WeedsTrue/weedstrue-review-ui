import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

const ProductSidebarInfo = ({ product, isLoading }) => {
  return (
    <>
      <ProductListItem product={product} />
    </>
  );
};

ProductSidebarInfo.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

export default ProductSidebarInfo;
