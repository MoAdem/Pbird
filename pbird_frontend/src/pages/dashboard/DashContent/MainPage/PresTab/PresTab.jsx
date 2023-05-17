import React, { useState } from "react";
import { useStyles } from "./PresTabStyles";
import { Table, Th, Thr, Tr, Td } from "../../../../../components/Table/Table";
import editIcon from "../../../../../assets/svgs/edit.svg";
import deleteIcon from "../../../../../assets/svgs/delete.svg";

const data = [
  {
    nom: "Inverness McKenzie",
    date: "14 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Alan McKenzie",
    date: "03 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Yosser McKenzie",
    date: "14 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Bessem McKenzie",
    date: "05 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Samar McKenzie",
    date: "14 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Majed McKenzie",
    date: "20 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Hayfa McKenzie",
    date: "18 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
  {
    nom: "Salah McKenzie",
    date: "10 Janvier 2022",
    maladie: "Angine",
    status: "Livré",
  },
];

function PresTab() {
  const css = useStyles();
  const [list, setList] = useState([...data]);
  const [nomdir, setNomdir] = useState("asc");
  const [datedir, setDatedir] = useState("asc");

  const Tri = (tab, att) => {
    return tab.sort((a, b) => a[att].localeCompare(b[att]));
  };

  const TriName = () => {
    if (nomdir === "asc") {
      setList(Tri([...data], "nom"));
      setNomdir("desc");
    } else {
      setList(Tri([...data], "nom").reverse());
      setNomdir("asc");
    }
  };

  const TriDate = () => {
    if (datedir === "asc") {
      setList(Tri([...data], "date"));
      setDatedir("desc");
    } else {
      setList(Tri([...data], "date").reverse());
      setDatedir("asc");
    }
  };

  return (
    <div className={css.prestab}>
      <h3>Liste des prescriptions</h3>
      <Table>
        <thead>
          <Thr>
            <Th>No </Th>
            <Th sortable={true} direction={nomdir === "asc"} onClick={TriName}>
              Nom
            </Th>
            <Th sortable={true} direction={datedir === "asc"} onClick={TriDate}>
              Date d'admission
            </Th>
            <Th>Maladies</Th>
            <Th>Status</Th>
            <Th right={true}>Editer</Th>
          </Thr>
        </thead>
        <tbody>
          {list.map((dt, key) => {
            return (
              <Tr key={key}>
                <Td>{key + 1 < 10 ? "0" + (key + 1) : key + 1}</Td>
                <Td>{dt.nom}</Td>
                <Td>{dt.date}</Td>
                <Td>{dt.maladie}</Td>
                <Td>{dt.status}</Td>
                <Td>
                  <div className="tab-buttons">
                    <Edit />
                    <Delete />
                  </div>
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

const Edit = (props) => {
  const { onClick } = props;
  const css = useStyles();
  return <img onClick={onClick} className={css.edit} src={editIcon} />;
};

const Delete = (props) => {
  const { onClick } = props;
  const css = useStyles();
  return <img onClick={onClick} className={css.delete} src={deleteIcon} />;
};

export default PresTab;
