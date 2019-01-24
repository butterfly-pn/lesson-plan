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

const classToUrl = {
  "1A": "o1",
  "1B": "o2",
  "1C": "o3",
  "1D": "o4",
  "1E": "o5",
  "2A": "o6",
  "2B": "o7",
  "2C": "o8",
  "2D": "o9",
  "2E": "o10",
  "3A": "o11",
  "3B": "o12",
  "3C": "o13",
  "3D": "o14",
  "3E": "o15",
  "3F": "o16",
  "4A": "o17",
  "4B": "o18",
  "4C": "o19",
  "4D": "o20",
  "4E": "o21",
  "4F": "o22"
};

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
      day: "Poniedziałek",
      currentClass: "2E"
    };
    this.getPlan();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentClass !== this.state.currentClass) {
      this.getPlan();
    }
  }

  getPlan = () => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const plan = xhr.responseText;
        let parsed = tabletojson.convert(plan);

        this.setState({ plan: parsed[2] });
      }
    };
    // Using outside service becouse of CORS policy
    xhr.open(
      "GET",
      `https://cors-escape.herokuapp.com/http://zsk.poznan.pl/plany/tk/plany/${
        classToUrl[this.state.currentClass]
      }.html`
    );
    xhr.send();
  };

  render() {
    return (
      <div className="App">
        <select onChange={e => this.setState({ day: e.target.value })}>
          {weekDays.map(day => (
            <option>{weekDaysToPolish[day]}</option>
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
        {this.state.plan
          ? this.state.plan.map(row => {
              if (row[this.state.day]) {
                let subject = row[this.state.day].split(" ");
                console.log(subject);
                const classroom = subject.pop();
                return (
                  <Subject
                    key={row.Godz + row[this.state.day]}
                    name={row[this.state.day].slice(
                      0,
                      row[this.state.day].length - classroom.length
                    )}
                    classroom={classroom}
                    color="#B036C3"
                  />
                );
              } else {
                return null;
              }
            })
          : null}
      </div>
    );
  }
}

export default App;
