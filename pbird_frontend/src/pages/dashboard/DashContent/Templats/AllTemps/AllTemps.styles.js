import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    padding: "20px 0px 15px 0px",

    "& h4": {
      fontSize: "21px",
      margin: "0px 0px 20px 0px",
      fontFamily: "myriad",
    },

    "& h4.table-title": {
      margin: "60px 0px 25px 0px",
    },

    "& .templates": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",

      "& .items": {
        display: "flex",
        maxWidth: "80%",
        flexWrap: "wrap",
      },

      "& button": {
        padding: "15px 25px !important",
        height: "min-content",
      },
    },
  },
  card: {
    margin: "0px 15px",
    width: "180px",

    "& img": {
      width: "100%",
      display: "block",
    },
    "& p": {
      textAlign: "center",
      color: "#000000",
      textDecoration: "underline",
      margin: "10px 0px 0px 0px",
      fontSize: "16px",
      fontWeight: "600",
    },
  },
  model: {
    width: "180px",
    height: "252px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    margin: "0px 20px 30px 20px",
    position: "relative",
    cursor: "pointer",
    "& .paper": {
      border: "solid 2px black",
      width: "620px",
      height: "877px",
      position: "absolute",
      transform: "scale(0.3)",
      padding: "40px",

      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
    },
    [theme.breakpoints.down("xl")]: {
      /*height: "500px",
      border: "solid 1px black",*/
    },
  },

  "& .body": {
    marginTop: "50px",
  },
  foldes: {
    padding: "0px 20px 0px 20px",

    "& .space50": {
      display: "inline-block",
      height: "10px",
      width: "50px",
      //backgroundColor: "red",
    },
    "& .space20": {
      display: "inline-block",
      height: "10px",
      width: "20px",
      //backgroundColor: "red",
    },

    "& table": {
      marginTop: "20px",
    },

    "& tr": {
      borderBottom: "solid 2px #D8EAE6",
    },

    "& td,th": {
      fontWeight: 600,
    },

    "& .folder-name": {
      display: "flex",
      alignItems: "center",
      color: "black !important",

      "& span": { fontSize: "18px" },
      "& img": {
        margin: "0px 10px 0px 0px",
      },
    },
    "& .folder-date , .folder-size": {
      fontSize: "18px",
      color: theme.palette.primary.main,
    },
    "& .buttons-group": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      padding: "18px 0px",
      "& button": {
        margin: "0px 5px",
      },
      "& .red-btn": {
        backgroundColor: "#f00",
        color: "white",
      },
    },
  },
  menuItems: {
    "& button": {
      width: "100%",
    },
  },
}));
