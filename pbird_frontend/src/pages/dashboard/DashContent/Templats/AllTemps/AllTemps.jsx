import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./AllTemps.styles";
import Button from "../../../../../components/Buttons/SubmitBtn";
import addimg from "../../../../../assets/svgs/icons/Groupe 17437.svg";
import threp from "../../../../../assets/svgs/icons/Groupe 17360.svg";

import Menu from "../../../../../components/Menu/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import TabButtonGf from "../../../../../components/Buttons/TabButtonGf";
import TabButtonGo from "../../../../../components/Buttons/TabButtonGo";
import TabButtonYf from "../../../../../components/Buttons/TabButtonYf";
import TabButtonRo from "../../../../../components/Buttons/TabButtonRo";
import {
  Table,
  Th,
  Td,
  Thr,
  Tr,
} from "../../../../../components/Table/TableFolder";

import { useDispatch, useSelector } from "react-redux";
import {
  GetAllTemplates,
  SetOneTemplate,
} from "../../../../../store/actions/Templates.action";
import { GetDocsByUserCreated } from "../../../../../store/actions/Fichier.action";

// dialogs
import QRcode from "../../Fichier/Popups/QRcode";
import DeleteItem from "../../Fichier/Popups/DeleteItem";
import Partager from "../../Fichier/Popups/Partager";
import ToFolderGroup from "../../Fichier/Popups/ToFolderGroup";

function AllTemps() {
  const css = useStyles();
  const navig = useNavigate();
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.Templates);

  const toCreatePage = () => {
    navig("/dashboard/templates/create");
  };

  useEffect(() => {
    dispatch(GetAllTemplates());
  }, []);

  return (
    <div className={css.main}>
      <h4>Mes fichiers</h4>
      <div className="templates">
        <div className="items">
          {templates.map((item, key) => {
            return <OneTemp Text={item} key={key} />;
          })}
        </div>
        <Button onClick={toCreatePage}>
          <img style={{ transform: "translateY(2px)" }} src={addimg} /> Créer un
          nouveau template
        </Button>
      </div>
      <h4 className="table-title">Fichiers créés récemment</h4>
      <FilesTable />
    </div>
  );
}

export default AllTemps;

const OneTemp = ({ Text }) => {
  const css = useStyles();
  const dispatch = useDispatch();
  const navig = useNavigate();

  const StartUpdate = () => {
    dispatch(SetOneTemplate(Text));
    navig("/dashboard/templates/modifier");
  };
  return (
    <div className={css.model} onClick={StartUpdate}>
      <div className="paper">
        <div className="g1">
          <div className="header">
            <div
              className="subInfo"
              dangerouslySetInnerHTML={{ __html: Text.header }}
            />
          </div>
          <div className="body">
            <div
              className="subInfo"
              dangerouslySetInnerHTML={{ __html: Text.body }}
            />
          </div>
        </div>
        <div className="footer">
          <div
            className="subInfo"
            dangerouslySetInnerHTML={{ __html: Text.footer }}
          />
        </div>
      </div>
    </div>
  );
};

function FilesTable() {
  const data = useSelector((state) => state.Fichier);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetDocsByUserCreated());
  }, []);

  const css = useStyles();
  return (
    <div className={css.foldes}>
      <Table>
        <thead>
          <Thr>
            <Th>Nom</Th>
            <Th>Source</Th>
            <Th>Dossier</Th>
            <Th>Date</Th>
            <Th>Taille</Th>
            <Th>Status</Th>
          </Thr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return <OneDoc key={key} item={item} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

const OneDoc = ({ item }) => {
  const { type, folder_name, created, document } = item;
  const { title, size, qr_code } = document;
  const css = useStyles();

  // the menu items of rename and delete ************************
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // the menu items of rename and delete ************************

  // the popup state to open and close **************************
  const [dialog, setdialog] = useState({
    active: false,
    type: "", // delete / rename / qrcode / share / to_folder
    value: null,
  });
  const openDial = (type, value) => {
    setdialog({ active: true, type: type, value: value });
  };

  const closeDial = () => {
    setdialog({ active: false, type: "", value: null });
  };
  const openQrcode = () => {
    openDial("qrcode", null);
  };
  // const openRename = () => {
  //   openDial("rename", title);
  // };
  const openDelete = () => {
    openDial("delete", [item]);
  };
  const openToFolder = () => {
    openDial("to_folder", [item]);
  };
  const openShare = () => {
    openDial("share", document.id);
  };
  // the popup state to open and close **************************

  return (
    <>
      <Tr>
        <Td>
          <div className={"folder-name"}>
            <span>{title}</span>
            <span className="space50" />
          </div>
        </Td>
        <Td>
          <div className={"folder-name"}>
            <span>{type ? type : "Générée"}</span>
            <span className="space50" />
          </div>
        </Td>
        <Td>
          <div className={"folder-name green-underlined"}>
            <span>{folder_name}</span>
            <span className="space50" />
          </div>
        </Td>
        <Td>
          <span className="folder-name">
            {new Date(created).toDateString()} <span className="space50" />
          </span>
        </Td>
        <Td>
          <span className="folder-name">
            {Math.floor(size / 1024)} ko <span className="space50" />
          </span>
        </Td>
        <Td>
          <span className="folder-name">
            {type ? type : "GENEREE"} <span className="space50" />
          </span>
        </Td>
        <Td className="buttons-group">
          <TabButtonGf>Afficher</TabButtonGf>
          <TabButtonGo onClick={openQrcode}>Code QR</TabButtonGo>

          <img src={threp} onClick={handleClick} />
          <div className="menu">
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              pos={5}
            >
              <div style={{ padding: "0px 10px" }} className={css.menuItems}>
                <MenuItem>
                  <TabButtonYf onClick={openShare}>Partager</TabButtonYf>
                </MenuItem>
                {/* <Divider />
                <MenuItem>
                  <TabButtonGf onClick={openRename}>Renommer</TabButtonGf>
                </MenuItem> */}
                <Divider />
                <MenuItem>
                  <TabButtonGf onClick={openToFolder}>Aff Dossier</TabButtonGf>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <TabButtonRo onClick={openDelete}>Supprimer</TabButtonRo>
                </MenuItem>
              </div>
            </Menu>
          </div>
        </Td>

        {/************************  POPUPS ************************/}
        {dialog.type === "qrcode" ? (
          <QRcode dialog={dialog} handleClose={closeDial} />
        ) : (
          <></>
        )}
        {dialog.type === "delete" ? (
          <DeleteItem dialog={dialog} handleClose={closeDial} />
        ) : (
          <></>
        )}
        {dialog.type === "share" ? (
          <Partager dialog={dialog} handleClose={closeDial} />
        ) : (
          <></>
        )}
        {dialog.type === "to_folder" ? (
          <ToFolderGroup dialog={dialog} handleClose={closeDial} />
        ) : (
          <></>
        )}

        {/************************  POPUPS ************************/}
      </Tr>
      <br />
    </>
  );
};
