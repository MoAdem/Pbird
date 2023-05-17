import React from "react";

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  inputContainer: {
    marginTop: "30px",
    [theme.breakpoints.down("xl")]: {
      marginTop: "15px",
    },
  },

  labels: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    color: "#95989A",
    fontSize: "18px",
    [theme.breakpoints.down("xl")]: {
      fontSize: "16px",
    },
  },

  error: {
    color: "#FF2200",
  },

  input: {
    fontSize: "20px",
    backgroundColor: "#FCFCFC",
    border: "solid 2px #95989A66",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px 0px",
    width: "100%",
    outline: "none",
    "&:focus": {
      border: "solid 2px #95989A",
    },

    [theme.breakpoints.down("xl")]: {
      fontSize: "14px",
      padding: "10px",
      margin: "5px 0px",
    },
  },
  input_error: {
    border: "solid 2px #FF2200",
  },
}));
function Select(props) {
  const css = useStyles();
  const {
    label,
    name,
    value,
    onChange,
    error = false,
    errorMs = "",
    list = [],
  } = props;
  return (
    <div className={css.inputContainer + " edited-input"}>
      <div className={css.labels}>
        <label className={css.label + " " + (error ? css.error : "")}>
          {label}
        </label>
        {error ? (
          <label className={`${css.label} ${css.error}`}>{errorMs}</label>
        ) : (
          ""
        )}
      </div>
      <select
        className={css.input}
        onChange={onChange}
        value={value}
        name={name}
      >
        {list.map((elem, key) => {
          return (
            <option value={elem.value} key={key}>
              {elem.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
