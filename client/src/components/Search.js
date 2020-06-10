import React from "react";
import {FormControl} from "react-bootstrap";

const Search = (props) => {
  return (
    <FormControl
    type="text"
    placeholder={props.placeholder}
    onChange={props.onSearchChange}
    name={props.name}
    value={props.value}
    />
  );
};

export default Search;
