import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

  render() {
    return (
      <table className="App">
        <thead>
          <th>Date</th>
          <th>Name</th>
          <th>Ammount</th>
          <th>Distance</th>
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
    );
  }
}

export default App;
