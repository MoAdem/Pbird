import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import Input from "../../../../../../components/Inputs/Input2";
import Button from "../../../../../../components/Buttons/TabButtonGf";
import { useDispatch } from "react-redux";
import { GenerateDocumentWithoutSignature } from "../../../../../../store/actions/Templates.action";

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
  const [title, settitle] = useState("");
  const dispatch = useDispatch();
  const { active, value } = dialog;
  const [disable, setDisable] = useState(false);
  const classes = useStyles();

  const errorCallBack1 = () => {
    setDisable(false);
  };

  const GenerateDoc = () => {
    setDisable(true);
    dispatch(
      GenerateDocumentWithoutSignature(
        value,
        title,
        handleClose,
        errorCallBack1
      )
    );
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
          <h3>Géneration D'un Document</h3>
          <p>Entrer le libellé du document</p>
          <Input
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
            placeholder="document libellé"
          />
          <Button loading={disable} onClick={GenerateDoc}>
            Genérer Document
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddFolderPopup;
