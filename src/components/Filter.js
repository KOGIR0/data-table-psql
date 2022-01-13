import Select from "./Select";
import { useState } from "react";

function Filter(props) {
  const [searchColumn, setSearchColumn] = useState("date");
  const [searchType, setSearchType] = useState("equal");

  const searchTypeValues = ["Equal", "Contains", "Bigger", "Smaller"];

  let inputType = "text";
  if (searchColumn === "ammount" || searchColumn === "distance") {
    inputType = "number";
  }

  return (
    <div>
      <Select
        name="columns"
        onSelect={(e) => setSearchColumn(e.target.value)}
        id="search-column"
        data={props.columnsSelectValues}
      />
      <Select
        name="type"
        id="search-type"
        onSelect={(e) => setSearchType(e.target.value)}
        data={searchTypeValues}
      />
      <input
        id="search-value"
        onChange={(e) => props.filter(searchColumn, searchType, e.target.value)}
        type={inputType}
      ></input>
    </div>
  );
}

export default Filter;
