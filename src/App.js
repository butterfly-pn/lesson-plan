import React, { Component } from "react";
import tabletojson from "tabletojson";

import "./App.css";
import Subject from "./components/Subject/Subject";

const weekDaysToPolish = {
  Monday: "Poniedziałek",
  Tuesday: "Wtorek",
  Wednesday: "Środa",
  Thursday: "Czwartek",
  Friday: "Piątek"
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const classes = [
  "1A",
  "1B",
  "1C",
  "1D",
  "1E",
  "2A",
  "2B",
  "2C",
  "2D",
  "2E",
  "3A",
  "3B",
  "3C",
  "3D",
  "3E",
  "3F",
  "4A",
  "4B",
  "4C",
  "4D",
  "4E",
  "4F"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: null,
      day: 0,
      currentClass: "2E",
      loading: true
    };
    this.getPlan();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentClass !== this.state.currentClass) {
      this.setState({ loading: true });
      this.getPlan();
    }
  }

  getPlan = () => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const plan = xhr.responseText;
        let parsed = tabletojson.convert(plan);

        this.setState({ plan: parsed[2], loading: false });
      }
    };
    // Using outside service becouse of CORS policy
    xhr.open(
      "GET",
      `https://cors-escape.herokuapp.com/http://zsk.poznan.pl/plany/tk/plany/o${classes.indexOf(
        this.state.currentClass
      ) + 1}.html`
    );
    xhr.send();
  };

  render() {
    return (
      <div className="App">
        <select onChange={e => this.setState({ day: e.target.value })}>
          {weekDays.map((day, i) => (
            <option value={i}>{weekDaysToPolish[day]}</option>
          ))}
        </select>
        <select
          onChange={e => {
            this.setState({ currentClass: e.target.value });
          }}
          value={this.state.currentClass}
        >
          {classes.map(c => (
            <option>{c}</option>
          ))}
        </select>
        {this.state.loading ? (
          <h1>I'M WORKING</h1>
        ) : this.state.plan ? (
          this.state.plan.map(row => {
            // Filter row to display only data from current day.
            const rowData = row[weekDaysToPolish[weekDays[this.state.day]]];
            let subject = rowData.split(" ");
            const classroom = subject.pop();
            return (
              <Subject
                key={row.Godz + rowData}
                name={rowData.slice(0, rowData.length - classroom.length)}
                classroom={classroom}
                hour={row.Godz.split("-")[0]}
                color="#B036C3"
              />
            );
          })
        ) : null}
      </div>
    );
  }
}

export default App;
