import { useState, useEffect } from "react";
import Table from "./Table";
import PageNumbers from "./PageNumbers";

function PagedTable(props) {
  const pageSize = props.pageSize || 5;
  const pageCount =
    Math.floor(props.data.length / pageSize) +
    (props.data.length % pageSize > 0 ? 1 : 0);
  const [direction, setDirection] = useState({
    name: "asc",
    ammount: "asc",
    distance: "asc",
  });

  const data = props.data.slice(
    pageSize * (props.currentPage - 1),
    pageSize * props.currentPage
  );

  let sort = (key) => {
    props.onHeaderClick(props.data, key, direction[key]);
    let newDirection = direction;
    newDirection[key] = newDirection[key] == "asc" ? "desc" : "asc";
    setDirection(direction);
  };

  return (
    <div>
      <Table data={data} onHeaderClick={sort} />
      <PageNumbers
        currentPage={props.currentPage}
        onPageNumClick={props.onPageClick}
        pageCount={pageCount}
      />
    </div>
  );
}

export default PagedTable;
