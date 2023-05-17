import React, { useState } from "react";

import { makeStyles } from "@mui/styles";

import {
  Table,
  Th,
  Td,
  Thr,
  Tr,
} from "../../../../components/Table/TableFolder";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import folderIcon from "../../../../assets/svgs/folder_page/folder.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Radio from "@mui/material/Radio";
import GreenOutlinedButton from "../../../../components/Buttons/GreenOutlinedButton";

const data = [];

const useStyles = makeStyles((theme) => ({
  foldes: {
    padding: "20px 0px 0px 0px",

    "& .space50": {
      display: "inline-block",
      height: "10px",
      width: "50px",
      //backgroundColor: "red",
    },
    "& .space20": {
      display: "inline-block",
      height: "10px",
      width: "20px",
      //backgroundColor: "red",
    },

    "& .folder-name": {
      display: "flex",
      alignItems: "center",
      "& span": { fontSize: "18px" },
      "& img": {
        margin: "0px 10px 0px 0px",
      },
    },
    "& .folder-date , .folder-size": {
      fontSize: "18px",
      color: theme.palette.primary.main,
    },
    "& .buttons-group": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      padding: "18px 0px",
    },
  },
}));

function FoldersMainP() {
  const css = useStyles();
  return (
    <div className={css.foldes}>
      <Table>
        <thead>
          <Thr>
            <Th>{/*selection*/}</Th>
            <Th /*align="center"*/>Dossier</Th>
            <Th>Date</Th>
            <Th>Taille</Th>
          </Thr>
        </thead>
        <tbody>
          <OneFolder />
          <OneFolder />
          <OneFolder />
          <OneFolder />
          <OneFolder />
          <OneFolder />
        </tbody>
      </Table>
    </div>
  );
}

const OneFolder = (props) => {
  const [selected, setSelected] = useState(false);

  const click = () => {
    setSelected(!selected);
  };

  return (
    <Tr>
      <Td>
        <span className="space20" />
        <Radio onClick={click} checked={selected} />
      </Td>
      <Td>
        <div className={"folder-name"}>
          <img src={folderIcon} /> <span>Infection palustre</span>
          <span className="space50" />
        </div>
      </Td>
      <Td>
        <span className="folder-date">
          12/01/2022 12:35h <span className="space50" />
        </span>
      </Td>
      <Td>
        <span className="folder-size">200 Ko</span>
      </Td>
      <Td className="buttons-group">
        <GreenOutlinedButton>Afficher</GreenOutlinedButton>
        <GreenOutlinedButton>Envoyer</GreenOutlinedButton>
        <GreenOutlinedButton>Code QR</GreenOutlinedButton>
        <GreenOutlinedButton isIcon={true}>
          <CloudDownloadIcon />
        </GreenOutlinedButton>
        <GreenOutlinedButton isIcon={true}>
          <MoreHorizIcon />
        </GreenOutlinedButton>
      </Td>
    </Tr>
  );
};

export default FoldersMainP;
