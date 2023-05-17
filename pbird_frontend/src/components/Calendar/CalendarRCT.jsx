import React from "react";
import Calendar from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
const dates = [
  new Date("2022-03-11T09:47:17.456000Z"),
  new Date("2022-03-12T09:47:17.456000Z"),
  new Date("2022-03-13T09:47:17.456000Z"),
];
const CalendarRTC = (props) => {
  return (
    <Calendar
      tileClassName={({ date, view }) => {
        let result = dates.filter((dt) => {
          return (
            dt.getDate() === date.getDate() &&
            dt.getMonth() === date.getMonth() &&
            dt.getFullYear() === date.getFullYear()
          );
        });
        if (result.length) {
          //console.log(result);
          return "highlitedDate";
        }
      }}
    />
  );
};

export default CalendarRTC;
