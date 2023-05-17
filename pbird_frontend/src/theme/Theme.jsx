// #1976D2 blue
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1DBF73",
      contrastText: "#ffffff",
    },
    success: {
      main: "#1DBF73",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FECD54",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFD950",
      contrastText: "#ffffff",
    },
  },
});

const Theme = (props) => {
  const { /*theme,*/ children } = props;

  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default Theme;
