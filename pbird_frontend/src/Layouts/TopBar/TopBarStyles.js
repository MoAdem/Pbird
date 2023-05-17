import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  TopBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",

    "& h3": {
      color: "#F80D38",
      fontSize: "24px",
      padding: "0px",
      margin: "0px",
      fontWeight: "400",
    },

    "& button": {
      padding: "14px 25px",
      fontSize: "18px",
      fontWeight: "500",
      margin: "0px 0px 0px 30px",
      // fontFamily:"Myriad Hebrew"
    },
  },
  notif_icon: {
    transform: "scale(2)",
    cursor: "pointer",
  },
  PersoGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& .button-notif": {
      padding: "9px",
      border: "solid 0.5px #00000088",
      margin: "0px 30px",
      "& img": {
        height: "25px",
        width: "25px",
      },
    },

    "& hr": {
      border: "solid 1px #222222bb",
      margin: "5px 20px 5px 15px",
    },

    "& .dwon-arrow": {
      transform: "scale(1.3)",
      cursor: "pointer",
      margin: "0px 0px 0px 10px",
    },
  },
  notif_menu: {
    padding: "10px",
  },

  AddProject: {
    padding: "0px 30px",
    "& .item": {
      backgroundColor: "#1DBF7333",
      borderRadius: "5px",
      width: "500px",
      margin: "25px 0px",
      padding: "17px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      //justifyContent:""

      "& .img-container": {
        height: "45px",
        width: "40px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "& img": {
          height: "35px",
        },
      },

      "& .divider": {
        height: "40px",
        width: "3px",
        borderRadius: "10px",
        backgroundColor: theme.palette.primary.main,
        margin: "0px 20px 0px 20px",
      },

      "& .text": {
        "& *": {
          color: theme.palette.primary.main,
          margin: "0px",
          fontFamily: "myriad",
        },
        "& h1": {
          fontSize: "18px",
          marginBottom: "5px",
        },
        "& h2": {
          fontSize: "14px",
        },
      },
    },
  },
}));
