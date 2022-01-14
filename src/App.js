import "./styles/App.css";
import React from "react";
import PagedFilterTable from "./components/PagedFilterTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

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
    return (
      <div className="App">
        <PagedFilterTable data={this.state.data} sortByKey={this.sortByKey} />
      </div>
    );
  }
}

export default App;
