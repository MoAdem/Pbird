import React from "react";

import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

export const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "12px",
    backgroundColor: "white",
    borderRadius: "11px",

    "& .progress": {
      borderRadius: "11px",
      height: "12px",
      minWidth: "12px",
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

function ProgressBar({ value = 0 }) {
  const css = useStyles();
  return (
    <div className={css.main}>
      <div className="progress" style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;
