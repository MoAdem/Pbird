import React from "react";
import Button from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "5px",
    border: `solid 2px ${theme.palette.error.main} !important`,
    outline: "none",

    backgroundColor: "transparent !important",
    padding: "0px 20px",
    lineHeight: "1.5 !important",
    margin: "0px 10px ",

    color: `${theme.palette.error.main} !important`,
    fontStyle: "myriad",
    fontSize: "16px",
    fontWeight: "600",

    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",

    transition: "all 0.1s",
    cursor: "pointer",

    [theme.breakpoints.down("xl")]: {
      fontSize: "16px",
      padding: "7px 50px",
    },

    // "&:hover": {
    //   backgroundColor: theme.palette.error.main,
    //   color: "white",
    //   "& *": {
    //     fill: "white !important",
    //   },
    // },
  },
  iconBtn: {
    padding: "5px 15px",
  },
}));

// RED OUTLINED
function TabButtonRo(props) {
  const css = useStyles();
  const {
    onClick,
    children,
    isIcon = false,
    className,
    loading = false,
  } = props;
  return (
    <Button
      variant="contained"
      loading={loading}
      className={`${css.btn} ${isIcon ? css.iconBtn : ""} ${className} `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default TabButtonRo;
