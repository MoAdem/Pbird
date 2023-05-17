import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    minHeight: "100vh",
    "& .images": {
      height: "100%",
      backgroundColor: "#A2A2A2",
    },

    "& .validation": {
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
          marginBottom: "0px",

          [theme.breakpoints.down("xl")]: {
            fontSize: "30px",
            margin: "20px 0px 5px 0px",
          },
        },

        "& .main-color": {
          color: theme.palette.primary.main,
          cursor: "pointer",
        },
      },

      "& form": {
        //width: "650px",
        padding: "0px",

        [theme.breakpoints.down("xl")]: {
          //width: "600px",
          padding: "0px",
        },

        "& p": {
          fontSize: "20px",
          textAlign: "center",
          color: "#999",
          fontWeight: "500",
          margin: "0px",
          padding: "0px",
          display: "inline-block",
          [theme.breakpoints.down("xl")]: {
            fontSize: "16px",
          },
        },

        "& .inputs": {
          padding: "50px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          "& .match": {
            border: `solid 3px ${theme.palette.primary.main} !important`,
          },

          "& .not-match": {
            border: `solid 3px #FF0000 !important`,
          },

          [theme.breakpoints.down("xl")]: {
            padding: "40px 0px",
          },

          "& input": {
            height: "80px",
            width: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "35px",
            textAlign: "center",
            backgroundColor: "#FCFCFC",
            border: "solid 3px #C7E6C2",
            borderRadius: "19px",
            transition: "all 0.1s",
            outline: "none",
            "&:focus": {
              border: `solid 3px ${theme.palette.primary.main}`,
            },

            [theme.breakpoints.down("xl")]: {
              height: "65px",
              width: "65px",
              fontSize: "30px",
              borderRadius: "15px",
              border: "solid 2px #C7E6C2",
              "&:focus": {
                border: `solid 2px ${theme.palette.primary.main}`,
              },
            },
          },
        },

        "& .resend-code": {
          textDecoration: "underline",
          color: "#56C596",
          textAlign: "left",
          cursor: "pointer",
        },

        "& button": {
          margin: "40px auto 0px auto",
          display: "block",
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
