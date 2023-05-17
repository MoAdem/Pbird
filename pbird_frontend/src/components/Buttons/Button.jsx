import React from "react";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: "21px",
    fontWeight: "600",
    padding: "10px 20px",
    outline: "none",
    border: "none",
    borderRadius: "12px",
    transition: "all 0.1s",
    "&:hover": {
      cursor: "pointer",
      //transform: "scale(1.05)",
    },
  },
  center: {
    display: "block",
    margin: "auto",
  },
}));

function GreenButton(props) {
  const css = useStyles();
  const { children, center = false } = props;
  return (
    <button className={`${css.button} ${center ? css.center : ""}`}>
      {props.children}
    </button>
  );
}

export default GreenButton;
