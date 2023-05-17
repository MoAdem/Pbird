import React from "react";

import { makeStyles } from "@mui/styles";
import DT from "../Calendar/DateRangePicker";

import img from "../../assets/svgs/icons/downInput.svg";

export const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    "& .content": {
      position: "absolute",
      borderRadius: "12px",
      border: "solid 2px #95989A66",
      marginTop: "75px",
      display: "none",
      "& *": {
        fontSize: "10px !important",
        fontWeight: "600",
      },
    },

    "&:hover": {
      "& .content": {
        display: "block",
      },
    },

    "& .icon": {
      position: "absolute",
      right: "10px",
      top: "25px",
      backgroundColor: "#FCFCFC",
      padding: "10px",
      transform: "scale(1.3)",
    },
  },

  inputContainer: {
    marginTop: "30px",
    [theme.breakpoints.down("xl")]: {
      marginTop: "15px",
    },
  },

  labels: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    color: "#95989A",
    fontSize: "18px",
    [theme.breakpoints.down("xl")]: {
      fontSize: "16px",
    },
  },

  error: {
    color: "#FF2200",
  },

  input: {
    fontSize: "20px",
    backgroundColor: "#FCFCFC",
    border: "solid 2px #95989A66",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px 0px",
    width: "100%",
    outline: "none",
    "&:focus": {
      border: "solid 2px #95989A",
    },

    [theme.breakpoints.down("xl")]: {
      fontSize: "14px",
      padding: "10px",
      margin: "5px 0px",
    },
  },
  input_error: {
    border: "solid 2px #FF2200",
  },
}));
function Calendar(props) {
  const css = useStyles();
  const { label, name, type = "text", value, onChange } = props;
  return (
    <div className={css.main}>
      <label className={css.label}>{label}</label>
      <input
        //onChange={onChange}
        //value={value}
        type={type}
        name={name}
        className={css.input}
        placeholder="yyyy-mm-dd to yyyy-mm-dd"
      />
      <img src={img} className="icon" />
      <div className="content">
        <DT onChange={onChange} />
      </div>
    </div>
  );
}

export default Calendar;
