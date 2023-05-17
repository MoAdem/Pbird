import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "5px",
    border: `solid 3px ${theme.palette.primary.main} `,
    outline: "none",

    backgroundColor: "transparent",
    padding: "10px 60px",
    margin: "0px 10px",

    color: theme.palette.primary.main,
    fontStyle: "myriad",
    fontSize: "20px",
    fontWeight: "600",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition: "all 0.1s",
    cursor: "pointer",

    [theme.breakpoints.down("xl")]: {
      fontSize: "16px",
      padding: "7px 50px",
    },

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      "& *": {
        fill: "white !important",
      },
    },
  },
  iconBtn: {
    padding: "5px 15px",
  },
}));

function GreenOutlinedButton(props) {
  const css = useStyles();
  const { onClick, children, isIcon = false } = props;
  return (
    <button
      className={`${css.btn} ${isIcon ? css.iconBtn : ""}`}
      variant="outlined"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default GreenOutlinedButton;
