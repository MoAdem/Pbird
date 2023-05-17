import React from "react";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    fontSize: "24px",
    color: "#000",
    padding: "0px",
    margin: "0px",
    fontWeight: "400",
    //fontFamily: "myriad",
  },
}));

function H2({ children }) {
  const css = useStyles();
  return <h2 className={css.main}> {children} </h2>;
}

export default H2;
