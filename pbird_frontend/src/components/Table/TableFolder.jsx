import React from "react";
import { makeStyles } from "@mui/styles";
import sortimg from "../../assets/svgs/Sort.svg";

export const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    borderCollapse: "collapse",
    //borderCollapse: "separate",
    borderSpacing: "0 1.5em",
  },
  th: {
    textAlign: "left",
    padding: "10px 0px",
    color: "#343434",
    fontSize: "18px",
    fontWeight: "400",
  },
  thh: {
    cursor: "pointer",
  },
  thr: {
    /*borderBottom: "solid 2px #D8EAE6"*/
  },
  tr: {
    transition: "all 0.4s",
    borderRadius: "20px",
    padding: "20px",
    margin: "20px",
    //cursor: "pointer",
    "& > :first-child": {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    "& > :last-child": {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    },

    "&:hover": {
      backgroundColor: "#646D8211",
    },
  },
  td: { padding: "15px 0px", color: "#646D82", backgroundColor: "white" },
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
    align = "left",
    direction,
  } = props;
  return (
    <th className={css.th} style={{ textAlign: align }}>
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
  const { onClick } = props;
  return (
    <tr onClick={onClick} className={css.tr}>
      {props.children}
    </tr>
  );
}

function Td(props) {
  const css = useStyles();
  const { className = "" } = props;
  return <td className={css.td + " " + className}>{props.children}</td>;
}

export { Table, Th, Tr, Thr, Td };
