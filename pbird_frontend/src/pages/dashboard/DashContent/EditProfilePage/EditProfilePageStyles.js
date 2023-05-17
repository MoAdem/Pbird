import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  editProfile: {
    padding: "50px 0px ",
    "& .img-importing-section": {
      "& .profile-img": {
        display: "block",
        margin: "auto",
      },
      "& p": {
        fontSize: "18px",
        textDecoration: "underline",
        textAlign: "center",
        cursor: "pointer",
      },
    },
    "& .inputs-section": {
      "& p": {
        color: "#100DB1",
        fontSize: "24px",
        padding: "0px",
        margin: "0px 0px 50px 0px",
      },
      "& .securite": {
        padding: "20px 0px",
        "& .signature": {
          color: "#C0C0BE",
        },
        "& .signCont": {
          display: "flex",
          alignItems: "center",

          "& .signContImg": {
            height: "210px",
            width: "210px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px black",
          },
          "& p": {
            textDecoration: "underline",
            padding: "0px",
            fontSize: "21px",
            margin: "0px 20px",
            color: "#343434",
            cursor: "pointer",
          },
        },
      },
      "& .parrameter-ordonnances": {
        padding: "20px 0px",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // jistifyContent: "center",

        "& .ords-imgs": {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          "& img": {
            width: "33%",
          },
        },
      },
    },
  },
}));
