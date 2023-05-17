import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import Button from "../../../../../components/Buttons/TabButtonGf";
import { useDispatch, useSelector } from "react-redux";
import { GetAllByUser } from "../../../../../store/actions/Dossier.action";
import { SendDocToFolder } from "../../../../../store/actions/Fichier.action";
import folderIcon from "../../../../../assets/images/Folder.png";

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
    "& .folders": {
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",

      "& .folder": {
        margin: "0px 10px",
        transition: "all 0.2s",
        cursor: "pointer",

        "& p": {
          textAlign: "center",
        },
        "&:hover": {
          transform: "scale(1.1)",
        },
      },
      "& .selected": {
        "& p": {
          color: theme.palette.primary.main,
        },
      },
    },
  },
}));

const ToFolderGroup = (props) => {
  const { dialog, handleClose } = props;
  const { active, value } = dialog;
  const dispatch = useDispatch();
  const classes = useStyles();
  const folders = useSelector((state) => state.Dossier);
  const [selected, setSelected] = useState("");
  const [disable, setDisable] = useState(false);

  const selectFolder = (folder) => {
    console.log(folder.folder.id);
    setSelected(folder.folder.id);
  };

  useEffect(() => {
    dispatch(GetAllByUser());
  }, []);

  const errorCallBack = () => {
    setDisable(false);
  };

  const HundleSubmit = () => {
    setDisable(true);
    let documents = value.map((item) => {
      return { id: item.document.id };
    });
    if (selected !== "") {
      console.log(documents, selected);
      dispatch(
        SendDocToFolder(documents, selected, handleClose, errorCallBack)
      );
    } else {
      alert("selectionner un dossier !");
    }
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
          <h3>Affecter à un Dossier</h3>
          <div className="folders">
            {folders.map((folder, key) => {
              return (
                <div
                  key={key}
                  className={`folder ${
                    selected === folder.folder.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    selectFolder(folder);
                  }}
                >
                  <img src={folderIcon} />
                  <p>{folder.folder.name}</p>
                </div>
              );
            })}
          </div>
          <Button loading={disable} onClick={HundleSubmit}>
            Affecter
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ToFolderGroup;
