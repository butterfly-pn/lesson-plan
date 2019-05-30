import React, { Component } from "react";
import tabletojson from "tabletojson";

import "./App.css";
import Day from "./components/Day/Day";

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
    this.currentDayRef = React.createRef();
    this.state = {
      plan: this.getPlanFromLocalStorage(),
      day: this.getCurrentDay(),
      currentClass: localStorage.getItem("plan-klasa") || "2E",
      loading: true
    };
    if (!this.state.plan) {
      this.getPlan();
    } else {
      this.state.loading = false;
    }
  }

  getPlanFromLocalStorage = () => {
    let c = localStorage.getItem("plan-klasa") || "2E";
    let plan = JSON.parse(localStorage.getItem("plan" + c));
    if (plan) {
      return plan.plan;
    }
    return null;
  };

  setClass = c => {
    localStorage.setItem("plan-klasa", c);
    this.setState({ currentClass: c });
    return c;
  };

  getCurrentDay = () => {
    let d = new Date();
    let n = d.getDay();
    return n - 1;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentClass !== this.state.currentClass) {
      this.setState({ loading: true });
      this.getPlan();
    }
  }

  getPlan = () => {
    let plan = localStorage.getItem("plan" + this.state.currentClass);
    if (plan && Date.now() - JSON.parse(plan).date < 604800000) {
      this.setState({ plan: JSON.parse(plan).plan, loading: false });
    } else {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const plan = xhr.responseText;
          let parsed = tabletojson.convert(plan);
          localStorage.setItem(
            "plan" + this.state.currentClass,
            JSON.stringify({ plan: parsed[2], date: Date.now() })
          );
          this.setState({ plan: parsed[2], loading: false });
        }
      };
      // Using outside service becouse of CORS policy
      xhr.open(
        "GET",
        `https://cors-escape.herokuapp.com/http://pliki.zsk.poznan.pl/plany/technikum/plany/o${classes.indexOf(
          this.state.currentClass
        ) + 1}.html`
      );
      xhr.send();
    }
  };

  render() {
    return (
      <div className="App">
        <select
          onChange={e => {
            this.setClass(e.target.value);
          }}
          value={this.state.currentClass}
        >
          {classes.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div id="pwa">Install on phone</div>
        {this.state.loading ? (
          <h1>I'M WORKING</h1>
        ) : this.state.plan ? (
          <div className="container">
            {weekDays.map((day, i) => (
              <Day
                id={i}
                key={i}
                day={day}
                subjects={this.state.plan.map(row => {
                  // Filter row to display only data from current day.
                  const rowData = row[weekDaysToPolish[day]];
                  let subject = rowData.split(" ");
                  const classroom = subject.pop();
                  return {
                    key: day + row.Godz,
                    name: rowData.slice(0, rowData.length - classroom.length),
                    classroom: classroom,
                    hour: row.Godz.split("-")[0]
                  };
                })}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
