import React from "react";

const Search = (props) => {
  return (
    <div>
      <input
    type="text"
    placeholder={props.placeholder}
    onChange={props.onSearchChange}
    name={props.name}
    value={props.value}
    />
    </div>
  );
};

export default Search;