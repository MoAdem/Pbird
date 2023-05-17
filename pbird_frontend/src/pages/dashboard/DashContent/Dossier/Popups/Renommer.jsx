import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Input from "../../../../../components/Inputs/Input2";
import Button from "../../../../../components/Buttons/TabButtonGf";
import { RenameFolder } from "../../../../../store/actions/Dossier.action";
import { useDispatch } from "react-redux";

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

const Renommer = (props) => {
  const { dialog, handleClose } = props;
  const { active, value } = dialog;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setname] = useState(value.name);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setname(value.name);
    console.log(value.name);
  }, [value]);

  const errorCallBack = () => {
    setDisable(false);
  };

  const inputHandler = (e) => {
    setname(e.target.value);
  };

  const Submit = () => {
    setDisable(true);
    dispatch(RenameFolder(value.id, name, handleClose, errorCallBack));
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
          <h3>Renommer votre Dossier</h3>
          <p>Nom du fichier</p>
          <Input
            onChange={inputHandler}
            value={name}
            placeholder="Entrer le nom de votre dossier"
          />
          <Button loading={disable} onClick={Submit}>
            Renommer
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Renommer;
