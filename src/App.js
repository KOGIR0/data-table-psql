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
      searchColumn: "",
      searchType: "",
      searchValue: "",
    };
  }

  componentDidMount() {
    fetch("/data.json")
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

  render() {
    return (
      <div>
        <div>
          <select
            name="columns"
            id="search-column"
            onChange={(e) => this.setState({ searchColumn: e.target.value })}
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
            {this.state.data.map((element) => {
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
