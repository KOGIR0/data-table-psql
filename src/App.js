import logo from "./logo.svg";
import "./App.css";
import React from "react";

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
    };

    this.filterData = this.filterData.bind(this);
    this.setSearchColumn = this.setSearchColumn.bind(this);
  }

  componentDidMount() {
    fetch("/data")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res,
        });
      });
  }

  sortByKey(key) {
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

    console.log(this.state.data, searchColumn, searchValue, searchType);

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
    return (
      <div>
        <div>
          <select
            name="columns"
            id="search-column"
            onChange={this.setSearchColumn}
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="ammount">Ammount</option>
            <option value="distance">Distance</option>
          </select>
          <select
            name="type"
            id="search-type"
            onChange={(e) => this.setState({ searchType: e.target.value })}
          >
            <option value="equal">Equal</option>
            <option value="contains">Contains</option>
            <option value="bigger">Bigger</option>
            <option value="smaller">Smaller</option>
          </select>
          <input
            id="search-value"
            onChange={(e) => this.setState({ searchValue: e.target.value })}
            type={this.state.inputType}
          ></input>
        </div>
        <table className="App">
          <thead>
            <th>Date</th>
            <th onClick={() => this.sortByKey("name")}>Name</th>
            <th onClick={() => this.sortByKey("ammount")}>Ammount</th>
            <th onClick={() => this.sortByKey("distance")}>Distance</th>
          </thead>
          <tbody>
            {this.filterData().map((element) => {
              return (
                <tr>
                  <td>{element.date}</td>
                  <td>{element.name}</td>
                  <td>{element.ammount}</td>
                  <td>{element.distance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
