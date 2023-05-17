import React, { useState, useEffect } from "react";
import { useStyles } from "./DossierStyle";
import Calendar from "../../../../components/Inputs/Calendar";
import Button from "../../../../components/Buttons/SubmitBtn";
import addimg from "../../../../assets/svgs/icons/Groupe 17437.svg";
import Menu from "../../../../components/Menu/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { GetAllByUser } from "../../../../store/actions/Dossier.action";
import {
  Table,
  Th,
  Td,
  Thr,
  Tr,
} from "../../../../components/Table/TableFolder";
import Radio from "@mui/material/Radio";
import TabButtonGf from "../../../../components/Buttons/TabButtonGf";
import TabButtonGo from "../../../../components/Buttons/TabButtonGo";
import TabButtonYf from "../../../../components/Buttons/TabButtonYf";
import TabButtonRo from "../../../../components/Buttons/TabButtonRo";
import threp from "../../../../assets/svgs/icons/Groupe 17360.svg";
import EditedSelect from "../../../../components/Inputs/EditedSelect";
import RechInput from "../../../../components/Inputs/RechInput2";
// dialogs
import Renommer from "./Popups/Renommer";
import QRcode from "./Popups/QRcode";
import DeleteItem from "./Popups/DeleteItem";
import Partager from "./Popups/Partager";
import DeleteGroup from "./Popups/DeleteGroup";
import PartagerAll from "./Popups/PartagerAll";
import AddFolder from "./Popups/AddFolder";

function Dossier() {
  const css = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Dossier);
  const [nbSelect, set_nbSelect] = useState(0);
  const [selData, setSelData] = useState([]);

  useEffect(() => {
    dispatch(GetAllByUser());
  }, []);

  useEffect(() => {
    setSelData(data);
    set_nbSelect(0);
  }, [data]);

  // useEffect(() => {
  //   handleChangeSelectedData(
  //     selData.filter((item) => {
  //       return item.selected;
  //     })
  //   );
  // }, [selData]);

  const handleSelect = (id) => {
    let newTab = [...selData];
    let index = newTab.findIndex((item) => item.id === id);
    newTab[index].selected = !newTab[index].selected;
    if (newTab[index].selected) {
      set_nbSelect(nbSelect + 1);
    } else if (nbSelect > 0) {
      set_nbSelect(nbSelect - 1);
    }
    setSelData(newTab);
  };

  // const handleChangeSelectedData = (data) => {
  //   setSelData(data);
  // };
  // useEffect(() => {
  //   console.log(selData);
  // }, [selData]);

  // POPUP FOR DELETE-UPDATE ALL
  const [dialog, setdialog] = useState({
    active: false,
    type: "", // delete_all / share_all // create
    value: null,
  });
  const openDial = (type, value) => {
    setdialog({ active: true, type: type, value: value });
  };

  const closeDial = () => {
    setdialog({ active: false, type: "", value: null });
    set_nbSelect(0);
    setSelData(
      selData.map((item) => {
        return { ...item, selected: false };
      })
    );
  };
  const openShareAll = () => {
    openDial(
      "share_all",
      selData.filter((item) => {
        return item.selected;
      })
    );
  };
  const openDelAll = () => {
    openDial(
      "delete_all",
      selData.filter((item) => {
        return item.selected;
      })
    );
  };
  const openCreate = () => {
    openDial("create", null);
  };

  return (
    <main className={css.main}>
      <br />
      <h4>Mes dossier</h4>
      <h5>Mes dossiers / Tous mes dossiers</h5>
      <div className={css.filter}>
        <div className="part1">
          <h4>Affichage</h4>
          <div className="claned-filter">
            {/* <Calendar onChange={() => {}} /> */}
          </div>
          <div className="source-filter">
            {/* <EditedSelect onChange={() => {}} /> */}
          </div>
          <div className="rech-filter">
            {/* <RechInput onChange={() => {}} /> */}
          </div>
        </div>
        <div className="part2">
          {nbSelect === 0 ? (
            <div className="add">
              <Button onClick={openCreate}>
                <img style={{ transform: "translateY(2px)" }} src={addimg} />
                Nouveau dossier
              </Button>
            </div>
          ) : (
            <div className="group">
              <Button onClick={openShareAll}>Partager</Button>
              <Button onClick={openDelAll} className="red-btn">
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>
      <br />
      <div className={css.foldes}>
        <Table>
          <thead>
            <Thr>
              <Th></Th>
              <Th>Nom</Th>
              <Th>Source</Th>
              <Th>Date</Th>
              <Th>Taille</Th>
            </Thr>
          </thead>
          <tbody>
            {selData.map((item, key) => {
              return (
                <OneFolder key={key} item={item} handleSelect={handleSelect} />
              );
            })}
          </tbody>
        </Table>
      </div>
      {dialog.type === "delete_all" ? (
        <DeleteGroup dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
      {dialog.type === "share_all" ? (
        <PartagerAll dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
      {dialog.type === "create" ? (
        <AddFolder dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
    </main>
  );
}

const OneFolder = ({ item, handleSelect }) => {
  const { id, selected, created } = item;
  const { name, size } = item.folder;
  // the state for checkbox *************************************
  const click = () => {
    handleSelect(id);
  };
  // the state for checkbox *************************************

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
    type: "", // delete / rename / qrcode / share
    value: null,
  });
  const openDial = (type, value) => {
    setdialog({ active: true, type: type, value: value });
  };

  const closeDial = () => {
    setdialog({ active: false, type: "", value: null });
  };
  const openQrcode = () => {
    openDial("qrcode", item.folder.qr_code);
  };
  const openRename = () => {
    openDial("rename", item.folder);
  };
  const openDelete = () => {
    openDial("delete", item.folder.id);
  };
  const openShare = () => {
    openDial("share", item.folder.id);
  };
  // the popup state to open and close **************************

  return (
    <>
      <Tr>
        <Td>
          <span className="space20" />
          <Radio onClick={click} checked={selected} />
        </Td>
        <Td>
          <div className={"folder-name green-underlined"}>
            <span>{name}</span>
            <span className="space50" />
          </div>
        </Td>
        <Td>
          <div className={"folder-name"}>
            <span>{"source"}</span>
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
            {size} <span className="space50" />
          </span>
        </Td>
        <Td className="buttons-group">
          <TabButtonGf>Afficher</TabButtonGf>
          <TabButtonGo onClick={openQrcode}>Code QR</TabButtonGo>
          <TabButtonYf onClick={openShare}>Partager</TabButtonYf>
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
              <div style={{ padding: "0px 10px" }} className="menu-items">
                <MenuItem>
                  <TabButtonGf onClick={openRename}>Renommer</TabButtonGf>
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
        {dialog.type === "rename" ? (
          <Renommer dialog={dialog} handleClose={closeDial} />
        ) : (
          <></>
        )}
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

        {/************************  POPUPS ************************/}
      </Tr>
      <br />
    </>
  );
};

export default Dossier;
