import React, { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const SearchInput = ({ onSearch, ...rest }) => {
  const { pathname } = useLocation();
  const [searchValue, onSearchChange] = useState('');

  useEffect(() => {
    onSearchChange('');
  }, [pathname]);

  useEffect(() => {
    if (searchValue) {
      onSearch(searchValue);
    }
  }, [searchValue]);

  return (
    <Select
      nothingFound="No options"
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      searchable
      {...rest}
    />
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func
};

export default SearchInput;
