import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    padding: "20px 0px 15px 0px",

    "& h4": {
      fontSize: "21px",
      margin: "0px",
      fontFamily: "myriad",
    },
    "& h5": {
      color: "#A2A2A2",
      fontSize: "18px",
      margin: "0px",
      marginTop: "10px",
      fontFamily: "myriad",
    },
  },

  filter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& .part1": {
      display: "flex",
      alignItems: "center",
    },

    "& .part2": {
      "& button": {
        padding: "15px 20px !important",
        margin: "0px 0px 0px 20px",
        minWidth: "180px",
        boxShadow: "0px 3px 6px #00000033",
      },
      "& .red-btn": {
        backgroundColor: "#F00",
      },
    },

    "& h4": {
      margin: "0px 10px 0px 0px",
    },

    "& .claned-filter": {
      width: "276px",
      margin: "0px 10px 0px 10px",
    },

    "& .source-filter , .rech-filter": {
      width: "230px",
      margin: "0px 10px 0px 10px",
    },

    "& .rech-filter": {
      width: "230px",
      margin: "0px 10px 0px 10px",
    },
  },

  foldes: {
    padding: "0px 20px 20px 20px",

    border: " solid 1px #CFD0D3",
    borderRadius: "5px",

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

    "& tbody tr": {
      border: " solid 1px #CFD0D3",
      borderRadius: "5px",
    },

    "&  th": {
      fontSize: "18px",
      fontFamily: "myriad",
      color: "#A2A2A2",
    },

    "& .folder-name": {
      display: "flex",
      alignItems: "center",
      "& span": { fontSize: "18px" },
      "& img": {
        margin: "0px 10px 0px 0px",
      },
    },
    "& .folder-date , .folder-size, .folder-name": {
      fontSize: "18px",
      fontFamily: "myriad",
      color: "#000000",
    },
    "& .green-underlined": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
    "& .buttons-group": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      padding: "18px 20px 18px 20px",

      "& button": {
        margin: "0px 5px !important",
      },

      "& img": {
        margin: "0px 10px",
        cursor: "pointer",
      },
    },
  },
}));
