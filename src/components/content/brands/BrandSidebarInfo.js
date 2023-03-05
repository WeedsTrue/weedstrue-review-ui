import React from 'react';
import PropTypes from 'prop-types';
import BrandInfoListItem from './BrandInfoListItem';

const BrandSidebarInfo = ({ brand }) => {
  return brand ? (
    <>
      <BrandInfoListItem brand={brand} />
    </>
  ) : (
    <>
      <BrandInfoListItem />
    </>
  );
};

BrandSidebarInfo.propTypes = {
  brand: PropTypes.object,
  isLoading: PropTypes.bool
};

export default BrandSidebarInfo;
