import { useState } from "react";
import Filter from "./Filter";
import PagedTable from "./PagedTable";

function PagedFilterTable(props) {
  const [searchColumn, setSearchColumn] = useState("date");
  const [searchType, setSearchType] = useState("equal");
  const [searchValue, setSearchValue] = useState("");
  const columnsSelectValues = Object.keys(props.data[0] || {}).map(
    (key) => key.charAt(0).toUpperCase() + key.slice(1)
  );

  let filterData = () => {
    let filteredData = props.data;

    if (searchValue === "") {
      return filteredData;
    }

    switch (searchType) {
      case "equal":
        filteredData = props.data.filter(
          (value) => value[searchColumn] == searchValue
        );
        break;
      case "contains":
        if (searchColumn !== "ammount" && searchColumn !== "distance") {
          filteredData = props.data.filter((value) =>
            value[searchColumn].includes(searchValue)
          );
        }
        break;
      case "bigger":
        filteredData = props.data.filter(
          (value) => value[searchColumn] > searchValue
        );
        break;
      case "smaller":
        filteredData = props.data.filter(
          (value) => value[searchColumn] < searchValue
        );
        break;
    }

    return filteredData;
  };

  let filter = (searchColumn, searchType, searchValue) => {
    setSearchColumn(searchColumn);
    setSearchType(searchType);
    setSearchValue(searchValue);
  };

  const filteredData = filterData(props.data);

  return (
    <div>
      <Filter columnsSelectValues={columnsSelectValues} filter={filter} />
      <PagedTable
        data={filteredData}
        onHeaderClick={props.sortByKey}
        pageSize={5}
      />
    </div>
  );
}

export default PagedFilterTable;
