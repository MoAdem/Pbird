import React from "react";

import { makeStyles } from "@mui/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const useStyles = makeStyles((theme) => ({
  inputContainer: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("xl")]: {
      marginTop: "10px",
    },
  },

  label: {
    color: "#95989A",
    fontSize: "18px",
    [theme.breakpoints.down("xl")]: {
      fontSize: "16px",
    },
  },
  input: {
    color: theme.palette.primary.main,
    borderRadius: "5px",
    margin: "0px 10px 0px 0px !important",
    outline: "none",
    padding: "0px !important",
    "& .MuiSvgIcon-root": { fontSize: 26 },

    [theme.breakpoints.down("xl")]: {
      "& .MuiSvgIcon-root": { fontSize: 24 },
    },
  },
}));
function CheckBx(props) {
  const css = useStyles();
  const { label, name, value = false, onChange } = props;
  return (
    <div className={css.inputContainer}>
      <Checkbox checked={value} onChange={onChange} className={css.input} />
      <label className={css.label}>{label}</label>
    </div>
  );
}

export default CheckBx;
