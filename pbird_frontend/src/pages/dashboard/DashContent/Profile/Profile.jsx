import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useStyles } from "./ProfileStyles";

import img from "../../../../assets/images/Circle2.png";
import editIcon from "../../../../assets/svgs/edit2.svg";
import empty_page from "../../../../assets/images/ordenances/empty_page.png";

import Input from "../../../../components/Inputs/Input";

const buttons = ["Personnel", "Security", "Templates"];

const Pers = {
  "First Name": "Bertan",
  "Last Name": "Alexandre",
  "Mail Adress": "Alexandre.Bertan@gmail.com",
  "Telephone Number": "+33 53 89 32 00",
};

function Profile() {
  const css = useStyles();
  const [act_section, setAct_section] = useState("Personnel");
  const [etat, setEtat] = useState(""); // etat = save - cancel

  const save = () => {
    setEtat("save");
  };

  const cancel = () => {
    setEtat("cancel");
  };

  const reset_etat = () => {
    setEtat("");
  };

  return (
    <div className={css.main}>
      <Grid container spacing={0}>
        <Grid item xl={2} lg={2} md={12} sm={12} xs={12}>
          <div className="img-importing-section">
            <img src={img} className="profile-img" />
            <p>Importer une image</p>
          </div>
        </Grid>
        <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
          <div className="form-section">
            <h1>Details</h1>
            <div className="btn-group">
              <div>
                {buttons.map((name, key) => {
                  return (
                    <button
                      key={key}
                      className={name == act_section ? "active" : ""}
                      onClick={() => {
                        setAct_section(name);
                      }}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="profile-info">
              {act_section === "Personnel" ? (
                <Personnel etat={etat} reset_etat={reset_etat} />
              ) : null}
              {act_section === "Security" ? (
                <Security etat={etat} reset_etat={reset_etat} />
              ) : null}
              {act_section === "Templates" ? (
                <Templates etat={etat} reset_etat={reset_etat} />
              ) : null}
            </div>
            <div className="btn-group bottom-btn-group ">
              <div className="icon-btns">
                <button className="icon-btn" onClick={cancel}>
                  <DoDisturbIcon className="icon" /> Annuler
                </button>
                <button className="icon-btn" onClick={save}>
                  <SaveIcon className="icon" /> Sauvguarder
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;

const Personnel = ({ etat, reset_etat }) => {
  const [nocv, setNocv] = useState(""); // name of changing value
  const [data, setData] = useState({ ...Pers });

  useEffect(() => {
    if (etat === "cancel") {
      setNocv("setNocv");
      reset_etat();
    }
  }, [etat]);

  const handlerChange = (event, name) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const ValOrInput = (name) => {
    return name === nocv ? (
      <Input onChange={handlerChange} name={name} value={data[name]} />
    ) : (
      data[name]
    );
  };

  return (
    <table>
      <tbody>
        {Object.keys(data).map((name, key) => {
          return (
            <tr
              key={key}
              className={key < Object.keys(data).length - 1 ? "tr-border" : ""}
            >
              <td className="info-name">{name}</td>
              <td className="info-value">{ValOrInput(name)}</td>
              <td className="info-edit">
                <img
                  src={editIcon}
                  onClick={() => {
                    setNocv(name === nocv ? "" : name);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Security = ({ etat, reset_etat }) => {
  const [adr, setAdr] = useState({
    focus: false,
    value: "4 Rue Léon Jost, 75017 Paris, France",
  }); // change adress;
  const [mdp, setMdp] = useState({
    focus: false,
    value: "*****************",
    actual: "",
    newpass: "",
    newpassconf: "",
  }); // change password;

  useEffect(() => {
    if (etat === "cancel") {
      setAdr({ ...adr, focus: false });
      setMdp({ ...mdp, focus: false });
      reset_etat();
    }
  }, [etat]);

  // to edit Adress

  const focusAdr = () => {
    setAdr({ ...adr, focus: !adr.focus });
  };

  const changeAdr = (event) => {
    setAdr({ ...adr, value: event.target.value });
  };

  // to Edit Mdp

  const focusMdp = () => {
    setMdp({ ...mdp, focus: !mdp.focus });
  };

  return (
    <table>
      <tbody>
        <tr className={"tr-border"}>
          <td className="info-name">Adress</td>
          <td className="info-value">
            {adr.focus ? (
              <Input value={adr.value} onChange={changeAdr} />
            ) : (
              adr.value
            )}
          </td>
          <td className="info-edit">
            <img src={editIcon} onClick={focusAdr} />
          </td>
        </tr>
        {!mdp.focus ? (
          <tr>
            <td className="info-name">Password</td>
            <td className="info-value">****************</td>
            <td className="info-edit">
              <img src={editIcon} onClick={focusMdp} />
            </td>
          </tr>
        ) : (
          <>
            <tr>
              <td className="info-name">Actual Password</td>
              <td className="info-value">
                <Input
                  value={mdp.actual}
                  onChange={(e) => {
                    setMdp({ ...mdp, actual: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="info-name">New Password</td>
              <td className="info-value">
                <Input
                  value={mdp.newpass}
                  onChange={(e) => {
                    setMdp({ ...mdp, newpass: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td className="info-name">Confirm Password</td>
              <td className="info-value">
                <Input
                  value={mdp.newpassconf}
                  onChange={(e) => {
                    setMdp({ ...mdp, newpassconf: e.target.value });
                  }}
                />
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

const Templates = () => {
  return (
    <div className="templates">
      <h2>Add New Templates</h2>
      <hr />
      <div className="cards">
        <TempCard />
        <TempCard />
        <TempCard />
        <TempCard />
        <TempCard />
        <TempCard />
      </div>
    </div>
  );
};

const TempCard = () => {
  return (
    <div className="temp-card">
      <img src={empty_page} />
      <h3>Blank document</h3>
    </div>
  );
};
