import "./styles/App.css";
import React from "react";
import Select from "./components/Select";
import Table from "./components/Table";
import PageNumbers from "./components/PageNumbers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      direction: {
        name: "asc",
        ammount: "asc",
        distance: "asc",
      },
      searchColumn: "date",
      searchType: "equal",
      searchValue: "",
      inputType: "text",
      currentPage: 1,
    };

    this.filterData = this.filterData.bind(this);
    this.setSearchColumn = this.setSearchColumn.bind(this);
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

  sortByKey(key) {
    if (key === "date") {
      return;
    }
    let direction = this.state.direction;
    const asc = direction[key] === "asc";
    let sortedData = this.state.data.sort((a, b) => {
      if (a[key] < b[key]) {
        return asc ? -1 : 1;
      } else if (a[key] > b[key]) {
        return asc ? 1 : -1;
      } else {
        return 0;
      }
    });
    direction[key] = asc ? "desc" : "asc";

    this.setState({
      data: sortedData,
      direction: direction,
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

  setSearchColumn(e) {
    const value = e.target.value;
    let inputType = "text";
    if (value === "ammount" || value === "distance") {
      inputType = "number";
    }
    this.setState({ searchColumn: value, inputType: inputType });
  }

  render() {
    const pageSize = 5;
    const filteredData = this.filterData();
    const pageCount =
      Math.floor(filteredData.length / pageSize) +
      (filteredData.length % pageSize > 0 ? 1 : 0);
    const tableData = filteredData.slice(
      pageSize * (this.state.currentPage - 1),
      pageSize * this.state.currentPage
    );
    const columnsSelectValues = Object.keys(this.state.data[0] || {}).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );
    const searchTypeSelectValues = ["Equal", "Contains", "Bigger", "Smaller"];

    return (
      <div className="App">
        <div>
          <Select
            name="columns"
            onSelect={this.setSearchColumn}
            id="search-column"
            data={columnsSelectValues}
          />
          <Select
            name="type"
            id="search-type"
            onSelect={(e) => this.setState({ searchType: e.target.value })}
            data={searchTypeSelectValues}
          />
          <input
            id="search-value"
            onChange={(e) => this.setState({ searchValue: e.target.value })}
            type={this.state.inputType}
          ></input>
        </div>
        <Table data={tableData} sortByKey={this.sortByKey} />
        <PageNumbers
          currentPage={this.state.currentPage}
          onPageNumClick={(pageNum) =>
            this.setState({ currentPage: pageNum + 1 })
          }
          pageCount={pageCount}
        />
      </div>
    );
  }
}

export default App;
