import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    padding: "20px 0px 15px 0px",

    "& .create-temp": {
      "& .previsualise": {
        color: theme.palette.primary.main,
        textAlign: "center",
        display: "block",
        margin: "15px auto 0px auto ",
        fontSize: "18px",
        cursor: "pointer",
        textDecoration: "underline",
      },
    },

    "& h4": {
      fontSize: "21px",
      margin: "0px 0px 50px 0px",
      fontFamily: "myriad",
      [theme.breakpoints.down("xl")]: {
        margin: "0px 0px 30px 0px",
        fontSize: "16px",
      },
    },

    "& .model": {
      width: "100%",
      height: "650px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      position: "relative",
      "& .paper": {
        border: "solid 2px black",
        width: "620px",
        height: "877px",
        position: "absolute",
        transform: "scale(0.74)",
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

    "& .text-editers": {
      width: "100%",
      height: "100%",
      margin: "0px 30px 0px 30px",
      "& .text-editer": {
        margin: "0px 0px 30px 0px",
      },
    },
    "& .buttons": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      "& button": {
        padding: "12px 20px",
        fontSize: "18px",
        margin: "0px 0px 0px 10px",
      },
    },
  },
}));
