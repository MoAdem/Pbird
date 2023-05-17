import * as React from "react";
import { makeStyles } from "@mui/styles";
import Input from "./Input2";
import img from "../../assets/svgs/topbar/Search.svg";

export const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    heigth: "100%",
    position: "relative",

    "& input": {
      margin: "0px !important",
      padding: "15px !important",
      borderRadius: "5px",
      paddingRight: "45px !important",

      //   "&:focus": {
      //     border: "solid 2px #95989A66 !important",
      //     borderRight: "0px !important",
      //   },
    },
    "& *": {
      margin: "0px",
    },

    "& img": {
      height: "30px",
      position: "absolute",
      right: "10px",
      top: "12px",
      backgroundColor: "#FCFCFC",
      padding: "5px",
      transform: "scale(1.3)",
      cursor: "pointer",
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

export default function RechInput2({ onChange, value }) {
  const css = useStyles();
  return (
    <div className={css.input}>
      <Input onChange={onChange} value={value} placeholder="Recherche ..." />
      <img src={img} />
    </div>
  );
}
