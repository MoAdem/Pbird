import React, { useState } from "react";
import RechInput from "../../components/Inputs/RechInput";
import { useStyles } from "./TopBarStyles";
import Notif_Avatar from "./Notif_Avatar";
import Button from "../../components/Buttons/SubmitBtn";
import Menu from "../../components/Menu/Menu";
import importer from "../../assets/svgs/topbar/Groupe 17926.svg";
import create from "../../assets/svgs/topbar/359200.svg";
import drag from "../../assets/svgs/topbar/Groupe 17929.svg";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { UploadFile } from "../../store/actions/Fichier.action";

function TopBarWithRech() {
  const css = useStyles();

  return (
    <div className={css.TopBar}>
      <RechInput />
      <AjouterModel />
      <Notif_Avatar />
    </div>
  );
}

export default TopBarWithRech;

const AjouterModel = () => {
  const css = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navig = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFiles = (e) => {
    dispatch(UploadFile(e.target.files, handleClose()));
  };

  return (
    <div>
      <Button onClick={handleClick}>Ajouter un projet</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        pos={80}
      >
        <div className={css.AddProject}>
          <label>
            <Item
              img={importer}
              onClick={() => {}}
              txt1="Importer un projet"
              txt2="Parcourez les fichiers de votre machine."
            />
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              multiple
              onChange={handleFiles}
              type="file"
            />
          </label>
          <Item
            img={drag}
            onClick={() => {
              navig("/dashboard/main");
            }}
            txt1="Drag and Drop"
            txt2="Faites glisser et déposez vos fichiers facilement."
          />
          <Item
            img={create}
            onClick={() => {
              navig("/dashboard/templates");
            }}
            txt1="Créer un document"
            txt2="Créez votre document grâce aux templates que vous avez créés"
          />
        </div>
      </Menu>
    </div>
  );
};

const Item = ({ img, txt1, txt2, onClick }) => {
  return (
    <div onClick={onClick} className="item">
      <div className="img-container">
        <img src={img} />
      </div>
      <div className="divider" />
      <div className="text">
        <h1>{txt1}</h1>
        <h2>{txt2}</h2>
      </div>
    </div>
  );
};
