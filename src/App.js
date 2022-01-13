import "./styles/App.css";
import React from "react";
import Filter from "./components/Filter";
import PagedTable from "./components/PagedTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchColumn: "date",
      searchType: "equal",
      searchValue: "",
    };

    this.filterData = this.filterData.bind(this);
    this.filter = this.filter.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
  }

  componentDidMount() {
    fetch("/data")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          data: res,
        });
      });
  }

  filterData() {
    const searchValue = this.state.searchValue;
    const searchType = this.state.searchType;
    const searchColumn = this.state.searchColumn;
    let filteredData = this.state.data;

    if (searchValue === "") {
      return filteredData;
    }

    switch (searchType) {
      case "equal":
        filteredData = this.state.data.filter(
          (value) => value[searchColumn] == searchValue
        );
        break;
      case "contains":
        if (searchColumn !== "ammount" && searchColumn !== "distance") {
          filteredData = this.state.data.filter((value) =>
            value[searchColumn].includes(searchValue)
          );
        }
        break;
      case "bigger":
        filteredData = this.state.data.filter(
          (value) => value[searchColumn] > searchValue
        );
        break;
      case "smaller":
        filteredData = this.state.data.filter(
          (value) => value[searchColumn] < searchValue
        );
        break;
    }

    return filteredData;
  }

  filter(searchColumn, searchType, searchValue) {
    this.setState({
      searchColumn: searchColumn,
      searchType: searchType,
      searchValue: searchValue,
    });
  }

  sortByKey(data, key, direction) {
    if (key === "date") {
      return;
    }

    const asc = direction === "asc";
    data = data.sort((a, b) => {
      if (a[key] < b[key]) {
        return asc ? -1 : 1;
      } else if (a[key] > b[key]) {
        return asc ? 1 : -1;
      } else {
        return 0;
      }
    });
    direction = asc ? "desc" : "asc";

    this.setState({
      data: data,
    });
  }

  render() {
    const filteredData = this.filterData();
    const columnsSelectValues = Object.keys(this.state.data[0] || {}).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );

    return (
      <div className="App">
        <Filter
          columnsSelectValues={columnsSelectValues}
          filter={this.filter}
        />
        <PagedTable
          data={filteredData}
          onHeaderClick={this.sortByKey}
          pageSize={5}
        />
      </div>
    );
  }
}

export default App;
