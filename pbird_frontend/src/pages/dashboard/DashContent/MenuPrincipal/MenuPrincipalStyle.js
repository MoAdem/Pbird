import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    padding: "15px 0px",
  },

  filedrag: {
    height: "420px",
    width: "100%",
    margin: "20px 0px",
    backgroundColor: "#F4F8FB",
    borderRadius: "24px",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23C5D1E2FF' stroke-width='5' stroke-dasharray='5 15 ' stroke-dashoffset='15' stroke-linecap='square'/%3e%3c/svg%3e")`,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    "& .drag-zone": {
      height: "100%",
      width: "100%",
      position: "absolute",
      zIndex: "11",
    },

    "& .container": {
      width: "426px",
      height: "315px",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      //transition: "all 0.1s",

      "& img": {
        height: "65px",
      },

      "& p": {
        textAlign: "center",
        color: "#636C80",
        fontSize: "24px",
      },

      "& button": {
        zIndex: "13",
      },
    },
  },

  dragging: {
    "& .container": {
      opacity: "0.3",
    },
  },

  uploadingState: {
    padding: "25px",
    width: "85%",
    margin: "auto",
    backgroundColor: "#F4F8FB",
    borderRadius: "24px",
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23C5D1E2FF' stroke-width='5' stroke-dasharray='5 15 ' stroke-dashoffset='15' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },

  devider: {
    width: "213px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "24px",

    "& hr": {
      width: "213px",
      position: "absolute",
      height: "1px",
      backgroundColor: "#93A9C3",
      border: "none",
    },
    "& .devider-content": {
      textAlign: "center",
      zIndex: "10",
      backgroundColor: "#F4F8FB",
      padding: "0px 5px",
      margin: "10px 0px",
      color: "#93A9C3 !important",
    },
  },

  foldes: {
    padding: "0px 0px 0px 0px",

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

    "& .folder-name": {
      display: "flex",
      alignItems: "center",
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
    },
  },
}));
