import React from "react";

function Select(props) {
  return (
    <select name={props.name} onChange={props.onSelect}>
      {props.data.map((value) => {
        return <option value={value.toLowerCase()}>{value}</option>;
      })}
    </select>
  );
}

export default Select;
