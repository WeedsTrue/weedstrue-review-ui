import React, { useState } from 'react';
import { Select } from '@mantine/core';
import PropTypes from 'prop-types';

const SearchInput = ({ onSearch, ...rest }) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <Select
      nothingFound="No options"
      onSearchChange={term => {
        onSearchChange(term);
        if (onSearch) {
          onSearch(term);
        }
      }}
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
