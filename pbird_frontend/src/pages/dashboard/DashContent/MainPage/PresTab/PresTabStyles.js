import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  prestab: {
    padding: "20px 20px",
    "& h3": {
      color: "#646D82",
      padding: "0px",
      fontWeight: "400",
      fontSize: "22px",
      margin: "0px 0px 10px 0px",
      textTransform: "uppercase",
    },
    "& .tab-buttons": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  edit: {
    margin: "0px 5px 0px 0px",
    display: "inline-block",
    cursor: "pointer",
  },
  delete: {
    margin: "0px",
    display: "inline-block",
    cursor: "pointer",
  },
}));
