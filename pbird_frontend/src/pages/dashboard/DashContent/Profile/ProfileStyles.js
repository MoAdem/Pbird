import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    //height: "900px",
    margin: "30px 0px 50px 0px",
    backgroundColor: "white",
    boxShadow: " 32px 32px 59px #329D9C33",
    borderRadius: "32px",
    padding: "50px 80px 50px 40px",

    "& .img-importing-section": {
      "& .profile-img": {
        display: "block",
        margin: "auto",
        width: "140px",
      },
      "& p": {
        fontSize: "18px",
        textDecoration: "underline",
        textAlign: "center",
        cursor: "pointer",
      },
    },

    "& .form-section": {
      padding: "0px 0px 0px 80px",

      "& h1": {
        margin: "0px 0px 40px 0px",
        padding: "0px",
        fontSize: "32px",
        fontWeight: "500",
      },

      "& .btn-group": {
        margin: "0px 0px 50px 0px",
        display: "flex",
        justifyContent: "space-between",
        "& button": {
          width: "160px",
          padding: "17px 0px ",
          margin: "0px 80px 0px 0px",

          fontSize: "18px",
          fontWeight: "500",

          backgroundColor: "transparent",
          border: "none",
          borderRadius: "16px",
          outline: "none",
          transition: "all 0.2s",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#EFEFEF",
          },
        },
        "& .icon-btns": {
          width: "100%",
          display: "flex",
          alignItens: "center",
          justifyContent: "flex-end",

          "& .icon-btn": {
            margin: "0px 10px",
            backgroundColor: "#EEE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "& .icon": {
              fontSize: "30px",
              margin: "0px 5px 0px 0px",
            },
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "white",
            },
          },
        },

        "& .active": {
          backgroundColor: `${theme.palette.primary.main} !important`,
          color: "white",
        },
      },

      "& .bottom-btn-group": {
        margin: "0px",
      },

      "& .profile-info": {
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          "& .tr-border": {
            borderBottom: "solid 1px #848484",
          },
          "& td": {
            height: "110px",
            //display:"flex",
          },
          "& .info-name": {
            width: "450px",
            fontSize: "21px",
            color: "#C0C0BE",
            fontWeight: "600",
            [theme.breakpoints.down("xl")]: {
              width: "auto",
            },
          },
          "& .info-value": {
            fontSize: "21px",
            fontWeight: "600",
            "& input": {
              width: "auto !important",
            },
          },
          "& .info-edit": {
            width: "80px",
          },
        },
        "& .templates": {
          padding: "0px 0px 50px 0px",
          "& h2": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
            fontSize: "21px",
            fontWeight: "700",
            margin: "0px",
            padding: "50px 0px",
            lineHeight: "1.5",
            cursor: "pointer",
            display: "inline-block",
          },
          "& hr": {
            display: "block",
            height: "1px",
            width: "100%",
            backgroundColor: "#848484",
            border: "0px",
          },
          "& .cards": {
            marginTop: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          },
          "& .temp-card": {
            margin: "0px 10px 20px 10px",
            "& img": {
              display: "block",
              height: "246px",
              width: "170px",
              //border: "solid 1px black",
            },
            "& h3": {
              margin: "10px 0px 0px 0px",
              textDecoration: "underline",
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            },
          },
        },
      },
    },
  },
}));
