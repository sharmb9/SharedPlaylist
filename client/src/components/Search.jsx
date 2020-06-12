import React from 'react';
import { FormControl } from 'react-bootstrap';

const Search = (props) => {
  const {
    placeholder, show, lists, name, value,
  } = props;
  return (
    <FormControl
      type="text"
      placeholder={placeholder}
      onChange={(e) => show(lists.filter(
        (p) => p.title && p.title.includes(e.target.value),
      ))}
      onClick={(e) => { if (!e.target.value) show(lists); }}
      name={name}
      value={value}
    />
  );
};

export default Search;
