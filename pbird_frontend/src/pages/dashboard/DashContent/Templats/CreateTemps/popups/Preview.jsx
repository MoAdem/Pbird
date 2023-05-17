import React from "react";

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
    minWidth: "620px",
  },
  main: {
    padding: "30px",
    Width: "620px",
    height: "877px",
    padding: "40px",

    "& .body": {
      marginTop: "100px",
    },
  },
}));

const Preview = (props) => {
  const { dialog, handleClose } = props;
  const { active, value } = dialog;
  const classes = useStyles();

  return (
    <div>
      <Dialog
        classes={{ paper: classes.paper }}
        open={active}
        TransitionComponent={Transition}
        onClose={handleClose}
        scroll={"body"}
      >
        <div className={classes.main}>
          <div className="header">
            <div
              className="subInfo"
              dangerouslySetInnerHTML={{ __html: value.header }}
            />
          </div>
          <div className="body">
            <div
              className="subInfo"
              dangerouslySetInnerHTML={{ __html: value.body }}
            />
          </div>
          <div className="footer">
            <div
              className="subInfo"
              dangerouslySetInnerHTML={{ __html: value.footer }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Preview;
