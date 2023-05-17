import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    minHeight: "100vh",
    "& .images": {
      height: "100%",
      backgroundColor: "#A2A2A2",
    },

    "& .register": {
      minHeight: "100vh",
      padding: "100px 0px",
      backgroundColor: "#FFFFFF",

      [theme.breakpoints.down("xl")]: {
        padding: "60px 0px",
      },

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",

      "& .logo": {
        display: "block",
        margin: "auto",
        [theme.breakpoints.down("xl")]: {
          height: "30px",
        },
      },

      "& .title": {
        "& h1": {
          fontSize: "46px",
          textAlign: "center",
          marginBottom: "20px",

          [theme.breakpoints.down("xl")]: {
            fontSize: "30px",
            margin: "20px 0px 5px 0px",
          },
        },

        "& p": {
          fontSize: "18px",
          textAlign: "center",
          color: "#999",
          [theme.breakpoints.down("xl")]: {
            fontSize: "14px",
            margin: "3px",
          },
        },

        "& .main-color": {
          color: theme.palette.primary.main,
          cursor: "pointer",
        },
      },

      "& form": {
        width: "600px",
        padding: "10px 0px",

        [theme.breakpoints.down("xl")]: {
          width: "500px",
          padding: "20px 0px 0px 0px",
        },

        "& .row": {
          display: "flex",
          justifyContent: "space-between",
          "& .edited-input": {
            width: "48%",
            marginTop: "0px !important",
          },
          /*[theme.breakpoints.down("xl")]: {
            flexDirection: "column",
            "& .edited-input": {
              width: "100%",
              marginTop: "0px !important",
            },
          },*/
        },

        "& button": {
          display: "block",
          margin: "30px auto",
          width: "100%",
        },
      },
      "& h6": {
        padding: "0px",
        margin: "0px",
        fontSize: "16px",
        fontWeight: "normal",
        color: "#A0A0A0",

        [theme.breakpoints.down("xl")]: {
          fontSize: "14px",
          margin: "3px",
        },

        "& span": {
          color: "#000000",
          fontWeight: "Bold",
        },
      },
    },
  },
}));
