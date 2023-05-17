import * as React from "react";
import { makeStyles } from "@mui/styles";
import Input from "./Input2";
import img from "../../assets/svgs/topbar/Search.svg";

export const useStyles = makeStyles((theme) => ({
  input: {
    width: "312px",
    heigth: "100%",
    display: "flex",
    alignItems: "center",

    "& input": {
      margin: "0px !important",
      padding: "13px !important",
      borderRight: "0px",
      borderRadius: "5px 0px 0px 5px",

      "&:focus": {
        border: "solid 2px #95989A66 !important",
        borderRight: "0px !important",
      },
    },
    "& *": {
      margin: "0px",
    },

    "& img": {
      padding: "12px",
      backgroundColor: "#FCFCFC",
      border: "solid 2px #95989A66",
      borderRadius: "0px 5px 5px 0px",

      [theme.breakpoints.down("xl")]: {
        height: "46px",
      },
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

export default function RechInput() {
  const css = useStyles();
  return (
    <div className={css.input}>
      <Input placeholder="Recherche ..." />
      <img src={img} />
    </div>
  );
}
