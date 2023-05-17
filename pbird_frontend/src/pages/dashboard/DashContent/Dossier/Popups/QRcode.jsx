import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import img from "../../../../../assets/images/qrcode/Groupe 17987.png";

const { REACT_APP_API_HOST } = process.env;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  main: {},
}));

const QRcode = (props) => {
  const { dialog, handleClose } = props;
  const { active, value } = dialog;
  const classes = useStyles();

  //   const Submit = () => {
  //     AddGal(Item);
  //     handleClose();
  //   };

  return (
    <div>
      <Dialog
        open={active}
        TransitionComponent={Transition}
        onClose={handleClose}
        scroll={"paper"}
      >
        <img src={REACT_APP_API_HOST + value} alt="qrcode" />
      </Dialog>
    </div>
  );
};

export default QRcode;
