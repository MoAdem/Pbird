import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";

export const useStyles = makeStyles((theme) => ({
  pieChart: {
    overflow: "unset !important",
    width: "100%",
    padding: "0px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .data": {
      "& h2": {
        color: "#646D82",
        padding: "0px",
        fontWeight: "500",
        fontSize: "24px",
        fontFamily: "arial",
      },
      "& h3": {
        color: "#A6B1C2",
        padding: "0px",
        fontWeight: "500",
        fontSize: "20px",
        fontFamily: "arial",
      },
      "& span": {
        height: "10px",
        width: "50px",

        display: "inline-block",
        borderRadius: "500px",
      },
      "& .primary": {
        backgroundColor: theme.palette.primary.main,
      },
      "& .error": {
        backgroundColor: theme.palette.error.main,
      },
      "& .warning": {
        backgroundColor: theme.palette.warning.main,
      },
    },

    "& .pie": {
      overflow: "unset !important",
      position: "relative",
      height: "160px",
      width: "160px",
      "& .circle": {
        position: "absolute",
      },
    },
  },
}));

const dataaa = [
  { label: "Homme", value: 50, color: "primary" },
  { label: "Enfant", value: 25, color: "error" },
  { label: "Femme", value: 25, color: "warning" },
];

function PieChart() {
  const css = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    let rot = 0;
    setData(
      dataaa.map((item) => {
        let newItem = { ...item, rotation: rot, value: item.value + 0.2 };
        rot += item.value * 3.6;
        return { ...newItem };
      })
    );
  }, []);
  return (
    <div className={css.pieChart}>
      <div className="data">
        <h2>Aperçu du rendez-vous</h2>
        {(data.length ? data : []).map((item, key) => {
          return (
            <h3 key={key}>
              <span className={item.color} /> {item.value - 0.2}% {item.label}
            </h3>
          );
        })}
      </div>
      <div className="pie">
        {(data.length ? data : []).map((item, key) => {
          return (
            <CircularProgress
              key={key}
              className="circle"
              style={{ transform: `rotate(${item.rotation}deg)` }}
              thickness={3}
              variant="determinate"
              size={160}
              value={item.value}
              color={item.color}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PieChart;
