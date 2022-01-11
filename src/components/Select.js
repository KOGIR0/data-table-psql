import React from "react";

function Select(props) {
  const options = props.data.map((value, index) => (
    <option key={index} value={value.toLowerCase()}>
      {value}
    </option>
  ));

  return (
    <select name={props.name} onChange={props.onSelect}>
      {options}
    </select>
  );
}

export default Select;
