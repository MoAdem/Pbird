import React from "react";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: "20px",
    padding: "20px 150px",
    outline: "none",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.1s",

    [theme.breakpoints.down("xl")]: {
      fontSize: "14px",
      padding: "10px 120px",
    },

    // "&:hover": {
    //   cursor: "pointer",
    //   transform: "scale(1.05)",
    // },
  },
  center: {
    display: "block",
    margin: "auto",
  },
}));

function SubmitBtn(props) {
  const css = useStyles();
  const { children, center = false, onClick, className = "" } = props;
  return (
    <button
      className={`${css.button} ${center ? css.center : ""} ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SubmitBtn;
