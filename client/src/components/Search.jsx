import React from 'react';
import { FormControl } from 'react-bootstrap';

const Search = (props) => {
  const {
    placeholder, onSearchChange, name, value,
  } = props;
  return (
    <FormControl
      type="text"
      placeholder={placeholder}
      onChange={onSearchChange}
      name={name}
      value={value}
    />
  );
};

export default Search;
