import React from "react";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    fontSize: "28px",
    color: "#000",
    padding: "0px",
    margin: "0px",
    fontWeight: "400",
    //fontFamily: "myriad",
  },
}));

function H1({ children }) {
  const css = useStyles();
  return <h1 className={css.main}> {children} </h1>;
}

export default H1;
