import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import Input from "../../../../../components/Inputs/Input2";
import Button from "../../../../../components/Buttons/TabButtonGf";
import { useDispatch } from "react-redux";
import { AddFolder } from "../../../../../store/actions/Dossier.action";

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

const AddFolderPopup = (props) => {
  const { dialog, handleClose } = props;
  const [name, setname] = useState("");
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const { active } = dialog;
  const classes = useStyles();

  const errorCallBack = () => {
    setDisable(false);
  };

  const Add = () => {
    setDisable(true);
    dispatch(AddFolder(name, handleClose, errorCallBack));
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
          <h3>Creation d'un' dossier</h3>
          <p>Entrer le nom du dossier</p>
          <Input
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="nom"
          />
          <Button loading={disable} onClick={Add}>
            Créer
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddFolderPopup;
