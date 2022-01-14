import "./styles/App.css";
import React from "react";
import PagedFilterTable from "./components/PagedFilterTable";
import { useState, useEffect } from "react";

function App(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data");
        const json = await res.json();
        console.log("Fetched data: ", json);
        setData(json);
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  let sortByKey = (data, key, direction) => {
    if (key === "date") {
      return;
    }

    const asc = direction === "asc";
    let sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return asc ? -1 : 1;
      } else if (a[key] > b[key]) {
        return asc ? 1 : -1;
      } else {
        return 0;
      }
    });
    direction = asc ? "desc" : "asc";
    console.log("Sorted data: ", sortedData);

    setData(sortedData);
  };

  return (
    <div className="App">
      <PagedFilterTable data={data} sortByKey={sortByKey} />
    </div>
  );
}

export default App;
