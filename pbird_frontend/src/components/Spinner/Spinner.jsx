import React from "react";

import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

export const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& div": {
      transform: "scale(3)",
    },
  },
}));

function Spinner() {
  const css = useStyles();
  return (
    <div className={css.main}>
      <div>
        <CircularProgress color="primary" />
      </div>
    </div>
  );
}

export default Spinner;
