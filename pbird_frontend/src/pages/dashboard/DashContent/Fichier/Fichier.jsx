import React, { useState, useEffect } from "react";
import { useStyles } from "./FichierStyle";
import Calendar from "../../../../components/Inputs/Calendar";
import Button from "../../../../components/Buttons/SubmitBtn";
import addimg from "../../../../assets/svgs/icons/Groupe 17437.svg";
import Menu from "../../../../components/Menu/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetDocsByUser } from "../../../../store/actions/Fichier.action";
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
import QRcode from "./Popups/QRcode";
import DeleteItem from "./Popups/DeleteItem";
import Partager from "./Popups/Partager";
import DeleteGroup from "./Popups/DeleteGroup";
import PartagerAll from "./Popups/PartagerAll";
import ToFolderGroup from "./Popups/ToFolderGroup";

const SourceList = [
  {
    title: "Telechargée",
    value: "UPLOADED",
  },
  {
    title: "Partagée",
    value: "SHARED",
  },
  {
    title: "Générée",
    value: null,
  },
  {
    title: "Tout",
    value: "all",
  },
];

function Fichier() {
  const css = useStyles();
  const [nbSelect, set_nbSelect] = useState(0);
  const [selected, set_selected] = useState([]);
  const navig = useNavigate();
  // FILTER SECTION

  const [filter, setFilter] = useState({
    name: "",
    source: "",
    date: { start: "", end: "" },
  });

  const setFilterName = (e) => {
    setFilter({ ...filter, name: e.target.value });
  };

  const setFiltersource = (val) => {
    setFilter({ ...filter, source: val });
  };

  const setFilterdate = (val) => {
    setFilter({ ...filter, date: val });
  };

  // POPUP FOR DELETE-UPDATE ALL
  const [dialog, setdialog] = useState({
    active: false,
    type: "", // delete_all / share_all / to_folder
    value: null,
  });
  const openDial = (type, value) => {
    setdialog({ active: true, type: type, value: value });
  };

  const closeDial = () => {
    setdialog({ active: false, type: "", value: null });
  };
  const openShareAll = () => {
    openDial("share_all", selected);
  };
  const openDelAll = () => {
    openDial("delete_all", selected);
  };
  const openToFolder = () => {
    openDial("to_folder", selected);
  };

  return (
    <main className={css.main}>
      <br />
      <h4>Mes fichiers</h4>
      <h5>Mes fichiers / Tous mes fichiers</h5>
      <div className={css.filter}>
        <div className="part1">
          <h4>Affichage</h4>
          <div className="claned-filter">
            <Calendar onChange={setFilterdate} />
          </div>
          <div className="source-filter">
            <EditedSelect
              items={SourceList}
              initial={3}
              onChange={setFiltersource}
            />
          </div>
          <div className="rech-filter">
            <RechInput onChange={setFilterName} value={filter.name} />
          </div>
        </div>
        <div className="part2">
          {nbSelect === 0 ? (
            <div className="add">
              <Button
                onClick={() => {
                  navig("/dashboard/templates");
                }}
              >
                <img style={{ transform: "translateY(2px)" }} src={addimg} />{" "}
                Nouveau fichier
              </Button>
            </div>
          ) : (
            <div className="group">
              <Button onClick={openShareAll}>Partager</Button>
              <Button onClick={openToFolder} className="yello-btn">
                Aff Dossier
              </Button>
              <Button onClick={openDelAll} className="red-btn">
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>
      <br />
      <FilesTable
        nbSelect={nbSelect}
        set_nbSelect={set_nbSelect}
        set_selected={set_selected}
        filter={filter}
      />
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
      {dialog.type === "to_folder" ? (
        <ToFolderGroup dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
    </main>
  );
}

function FilesTable({ nbSelect, set_nbSelect, set_selected, filter }) {
  const data = useSelector((state) => state.Fichier);
  const dispatch = useDispatch();
  const [selData, setSelData] = useState([...data]);

  useEffect(() => {
    dispatch(GetDocsByUser());
  }, []);

  useEffect(() => {
    setSelData(data);
  }, [data]);

  useEffect(() => {
    let { name, source, date } = filter;
    setSelData(
      data.filter((item) => {
        console.log(item.created);
        console.log(date.start);
        return (
          (item.type === source || source === "all") &&
          (item.document.title.indexOf(name) !== -1 || name === "") &&
          ((new Date(item.created) >= date.start &&
            new Date(item.created) <= date.end) ||
            (date.start === "" && date.end === ""))
        );
      })
    );
  }, [filter]);

  useEffect(() => {
    set_selected(
      selData.filter((item) => {
        return item.selected;
      })
    );
  }, [selData]);

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

  const css = useStyles();
  return (
    <div className={css.foldes}>
      <Table>
        <thead>
          <Thr>
            <Th></Th>
            <Th>Nom</Th>
            <Th>Source</Th>
            <Th>Dossier</Th>
            <Th>Date</Th>
            <Th>Taille</Th>
            <Th>Status</Th>
          </Thr>
        </thead>
        <tbody>
          {selData.map((item, key) => {
            return <OneDoc key={key} item={item} handleSelect={handleSelect} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

const OneDoc = ({ item, handleSelect }) => {
  const { id, selected, type, folder_name, created, document } = item;
  const { title, size, qr_code } = document;
  const css = useStyles();
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
          <span className="space20" />
          <Radio onClick={click} checked={selected} />
        </Td>
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
        {/* {dialog.type === "rename" ? (
          <Renommer dialog={dialog} handleClose={closeDial} />
        ) : (
          <></>
        )} */}
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

export default Fichier;
