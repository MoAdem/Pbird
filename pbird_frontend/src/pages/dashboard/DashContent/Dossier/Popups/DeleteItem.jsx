import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "../../../../../components/Buttons/TabButtonGf";

import { useDispatch } from "react-redux";
import { SendToTrushOne } from "../../../../../store/actions/Dossier.action";

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
    padding: "45px 30px",
    minWidth: "650px",
    "& h3": {
      color: theme.palette.primary.main,
      fontSize: "24px",
      margin: "0px 0px 20px 0px",
      fontWeight: "600",
    },
    "& p": {
      fontSize: "18px",
      margin: "0px 0px 20px 0px",
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
      color: "white",
    },
  },
}));

const DeleteItem = (props) => {
  const { dialog, handleClose } = props;
  const { active, value } = dialog;
  const [disable, setDisable] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const errorCallBack = () => {
    setDisable(false);
  };

  const handleSubmit = () => {
    setDisable(true);
    dispatch(SendToTrushOne(value, handleClose, errorCallBack));
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
          <h3>Supprimer un dossier</h3>
          <p>vous êtes sure de supprimer ce dossier ?</p>
          <Button loading={disable} onClick={handleSubmit}>
            Supprimer
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteItem;
