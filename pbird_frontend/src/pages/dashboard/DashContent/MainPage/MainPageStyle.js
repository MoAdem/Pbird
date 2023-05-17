import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  MainPage: {
    padding: "50px 0px",
    "& .chart-title": {
      padding: "0px 5px",
      margin: "0px",
      fontWeight: "400",
      fontSize: "20px",
      color: "#646D82",
      "& span": { fontSize: "26px" },
      "& .primary": { color: theme.palette.primary.main },
      "& .secondary": { color: theme.palette.secondary.main },
    },
  },
}));
