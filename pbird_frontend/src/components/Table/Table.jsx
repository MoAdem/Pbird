import React from "react";
import { makeStyles } from "@mui/styles";
import sortimg from "../../assets/svgs/Sort.svg";

export const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "5px 0px",
    color: "#CBD1D9",
    fontSize: "18px",
    fontWeight: "400",
  },
  thh: {
    cursor: "pointer",
  },
  thr: { borderBottom: "solid 2px #D8EAE6" },
  tr: {
    borderBottom: "solid 1px #D8EAE6",
    transition: "all 0.4s",
    "&:hover": {
      backgroundColor: "#646D8211",
    },
  },
  td: { padding: "20px 5px", color: "#646D82" },
}));

function Table(props) {
  const css = useStyles();
  return <table className={css.table}>{props.children}</table>;
}

function Th(props) {
  const css = useStyles();
  const {
    sortable = false,
    onClick = () => {},
    right = false,
    direction,
  } = props;
  return (
    <th
      className={css.th}
      style={{ textAlign: right ? "right !important" : "left" }}
    >
      <span className={sortable ? css.thh : ""} onClick={onClick}>
        {props.children}{" "}
        {sortable ? (
          <img
            style={{ transform: `scaleY(${direction ? 1 : -1})` }}
            src={sortimg}
          />
        ) : (
          ""
        )}
      </span>
    </th>
  );
}

function Thr(props) {
  const css = useStyles();
  return <tr className={css.thr}>{props.children}</tr>;
}

function Tr(props) {
  const css = useStyles();
  return <tr className={css.tr}>{props.children}</tr>;
}

function Td(props) {
  const css = useStyles();
  return <td className={css.td}>{props.children}</td>;
}

export { Table, Th, Tr, Thr, Td };
