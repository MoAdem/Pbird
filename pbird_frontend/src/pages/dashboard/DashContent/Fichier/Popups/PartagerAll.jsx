import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Input from "../../../../../components/Inputs/Input2";
import Button from "../../../../../components/Buttons/TabButtonGf";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { ShareMultipleDocs } from "../../../../../store/actions/Fichier.action";

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
          fontSize: "22px",
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

const PartagerAll = (props) => {
  const [type, settype] = useState(""); // type is : email - mobile
  const [dests, setdests] = useState({ value0: "" });
  const { dialog, handleClose } = props;
  const [disable, setDisable] = useState(false);
  const { active, value } = dialog;
  const dispatch = useDispatch();

  const classes = useStyles();

  const shareWithEmail = () => {
    settype("email");
  };

  const shareWithMobile = () => {
    settype("mobile");
  };

  const inputHandler = (e) => {
    setdests({
      ...dests,
      [e.target.name]: e.target.value,
    });
  };

  const addPerso = () => {
    let num = Object.keys(dests).length;
    let key = "value" + num;
    setdests({ ...dests, [key]: "" });
  };

  const errorCallBack = () => {
    setDisable(false);
  };

  const handleSubmit = () => {
    setDisable(true);
    let users = Object.keys(dests)
      .map((item) => {
        return type === "mobile"
          ? { phone_number: dests[item] }
          : { email: dests[item] };
      })
      .filter((item) => {
        return (
          (type === "mobile" && item.phone_number) ||
          (!type === "mobile" && item.email)
        );
      });
    let documents = value.map((item) => {
      return { id: item.document.id };
    });
    dispatch(ShareMultipleDocs(documents, users, handleClose, errorCallBack));
  };

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
          <h3>Partager votre Fichiers</h3>
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
              {Object.keys(dests).map((item, key) => {
                return (
                  <Input
                    key={key}
                    name={item}
                    onChange={inputHandler}
                    value={dests[item]}
                    placeholder="+ - -   - - -   - - -"
                  />
                );
              })}
              <h4 onClick={addPerso}>Ajouter un autre numéro</h4>
              <Button loading={disable} onClick={handleSubmit}>
                PartagerAll
              </Button>
            </div>
          ) : null}
          {type === "email" ? (
            <div>
              <p>Entrer l'email</p>

              {Object.keys(dests).map((item, key) => {
                return (
                  <Input
                    key={key}
                    onChange={inputHandler}
                    name={item}
                    value={dests[item]}
                    placeholder="email"
                  />
                );
              })}
              <h4 onClick={addPerso}>Ajouter un autre email</h4>
              <Button loading={disable}>Partager</Button>
            </div>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
};

export default PartagerAll;

/*import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Input from "../../../../../components/Inputs/Input2";
import Button from "../../../../../components/Buttons/TabButtonGf";

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
    "& h3": {
      color: theme.palette.primary.main,
      fontSize: "24px",
      margin: "0px 0px 20px 0px",
      fontWeight: "600",
    },
    "& p": {
      fontSize: "18px",
      margin: "0px 0px -5px 0px",
      fontWeight: "600",
      color: "black",
    },
    "& input": {
      width: "100%",
    },
    "& button": {
      fontSize: "18px",
      fontWeight: "600",
      display: "block",
      margin: "auto",
      marginTop: "20px",
      padding: "12px 40px",
    },
  },
}));

const Partager = (props) => {
  const { dialog, handleClose } = props;
  const { active } = dialog;
  const classes = useStyles();

  //   const Submit = () => {
  //     AddGal(Item);
  //     handleClose();
  //   };

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
          <h3>Partager votre fichiers</h3>
          <p>Entrer le numéro de téléphone</p>
          <Input placeholder="+ - -   - - -   - - -" />
          <Button>Partager</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Partager;

*/
