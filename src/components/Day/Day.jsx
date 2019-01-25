import React from "react";
import Subject from "../Subject/Subject";

import styles from "./style.module.scss";

/**
 * @name Day
 * @description Lesson plan for day
 * @example
 * {weekDays.map(day => (
 * <Day
 *   key={day}
 *   day={day}
 *   subjects={this.state.plan.map(row => {
 *     // Filter row to display only data from current day.
 *     const rowData = row[weekDaysToPolish[day]];
 *     let subject = rowData.split(" ");
 *     const classroom = subject.pop();
 *     return {
 *       key: row.Godz + rowData,
 *       name: rowData.slice(0, rowData.length - classroom.length),
 *       classroom: classroom,
 *       hour: row.Godz.split("-")[0]
 *     };
 *   })}
 * />
 *))}
 */
export default class Day extends React.Component {
  render() {
    return (
      <div className={styles.day} id={this.props.id}>
        <h2>{this.props.day}</h2>
        {this.props.subjects.map((subject, i) => (
          <>
            {subject.name ? (
              <Subject
                key={subject.key}
                name={subject.name}
                classroom={subject.classroom}
                hour={subject.hour}
                color="#fa77fc"
              />
            ) : (
              <div className={styles.free} />
            )}
          </>
        ))}
      </div>
    );
  }
}
