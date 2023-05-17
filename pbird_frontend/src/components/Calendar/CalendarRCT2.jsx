import React, { Component } from "react";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
class CalendarRTC extends Component {
  setClass = (date) => {
    const dateobj =
      this.props.eventsList &&
      this.props.eventsList.find((x) => {
        return (
          date.getDay() === new Date(x.start).getDay() &&
          date.getMonth() === new Date(x.start).getMonth() &&
          date.getDate() === new Date(x.start).getDate()
        );
      });
    return dateobj ? dateobj.colorName : "";
  };
  render() {
    return (
      <Calendar
        tileClassName={({ activeStartDate, date, view }) => this.setClass(date)}
      />
    );
  }
}

export default CalendarRTC;
