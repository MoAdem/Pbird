import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Input from "../../../../../../components/Inputs/Input2";
import Button from "../../../../../../components/Buttons/TabButtonGf";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: "650px",
  },
  main: {
    padding: "30px",
    minWidth: "650px",
    overflowX: "hidden",
    "& h3": {
      color: theme.palette.primary.main,
      fontSize: "24px",
      margin: "0px 0px 20px 0px",
      fontWeight: "600",
    },
    "& h4": {
      fontWeight: "500",
      fontSize: "18px",
      color: theme.palette.primary.main,
      textDecoration: "underline",
      cursor: "pointer",
    },
    "& p": {
      fontSize: "18px",
      margin: "0px 0px -5px 0px",
      fontWeight: "600",
      color: "black",
    },
    "& input": {
      width: "100%",
      margin: "0px !important",
    },
    "& button": {
      fontSize: "18px",
      fontWeight: "600",
      display: "block",
      margin: "auto",
      marginTop: "20px",
      padding: "12px 40px",
    },

    "& .choix": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: "40px",
      marginBottom: "20px",

      "& .option": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        "& .border": {
          border: "solid 6px black",
          padding: "20px",
          borderRadius: "500px",
        },

        "& .icon": {
          fontSize: "70px",
        },

        "& p": {
          margin: "20px 0px 0px 0px",
          textAlign: "center",
          fontSize: "20px",
          color: "black",
        },

        "&:hover": {
          cursor: "pointer",
          "& .border": {
            border: `solid 6px ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.primary.main,
          },

          "& .icon": {
            fontSize: "70px",
            color: "white",
          },

          "& p": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  },
}));

const Partager = (props) => {
  const [type, settype] = useState(""); // type is : email - mobile
  const [persons, setpersons] = useState({ value0: "" });
  const { dialog, handleClose } = props;
  const { active } = dialog;
  const classes = useStyles();

  const shareWithEmail = () => {
    settype("email");
  };

  const shareWithMobile = () => {
    settype("mobile");
  };

  const addPerso = () => {
    let num = Object.keys(persons).length;
    let key = "value" + num;
    setpersons({ ...persons, [key]: "" });
  };

  useEffect(() => {
    console.log(persons);
  }, [persons]);

  return (
    <div>
      <Dialog
        classes={{ paper: classes.paper }}
        open={active}
        TransitionComponent={Transition}
        onClose={handleClose}
        scroll={"paper"}
      >
        <div className={classes.main}>
          <h3>Partager votre fichier</h3>
          {type === "" ? (
            <div className="choix">
              <div className="option" onClick={shareWithMobile}>
                <div className="border">
                  <ContactPhoneIcon className="icon" />
                </div>
                <p>Numéro de téléphone</p>
              </div>
              <div className="option" onClick={shareWithEmail}>
                <div className="border">
                  <ContactMailIcon className="icon" />
                </div>

                <p>Adresse email</p>
              </div>
            </div>
          ) : null}
          {type === "mobile" ? (
            <div>
              <p>Entrer le numéro de téléphone</p>
              {Object.keys(persons).map((item, key) => {
                return (
                  <Input
                    key={key}
                    name={item}
                    placeholder="+ - -   - - -   - - -"
                  />
                );
              })}
              <h4 onClick={addPerso}>Ajouter un autre numéro</h4>
              <Button>Partager</Button>
            </div>
          ) : null}
          {type === "email" ? (
            <div>
              <p>Entrer l'email</p>

              {Object.keys(persons).map((item, key) => {
                return <Input key={key} name={item} placeholder="email" />;
              })}
              <h4 onClick={addPerso}>Ajouter un autre email</h4>
              <Button>Partager</Button>
            </div>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
};

export default Partager;
