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
  const [currentPage, setCurrentPage] = useState(1);

  const data = props.data.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
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
        currentPage={currentPage}
        onPageNumClick={(pageNum) => setCurrentPage(pageNum + 1)}
        pageCount={pageCount}
      />
    </div>
  );
}

export default PagedTable;
