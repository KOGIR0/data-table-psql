import React from "react";

function Select(props) {
  const options = props.data.map((value) => (
    <option value={value.toLowerCase()}>{value}</option>
  ));

  return (
    <select name={props.name} onChange={props.onSelect}>
      {options}
    </select>
  );
}

export default Select;
