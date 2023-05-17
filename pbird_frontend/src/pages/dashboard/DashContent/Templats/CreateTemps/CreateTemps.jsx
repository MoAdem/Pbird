import React, { useState, useEffect } from "react";
import { useStyles } from "./CreateTemps.styles";
import Grid from "@mui/material/Grid";
import TextEditor from "../../../../../components/Inputs/TextEditor";

import TabButtonGf from "../../../../../components/Buttons/TabButtonGf";
import { useDispatch } from "react-redux";
import { GenerateTemplate } from "../../../../../store/actions/Templates.action";
import Partager from "./popups/Partager";
import Preview from "./popups/Preview";
import GenTempAndDoc from "./popups/GenerateTempAndDoc";

import { useNavigate } from "react-router-dom";

function CreateTemps() {
  const css = useStyles();
  const [Text, setText] = useState({ header: " ", body: " ", footer: " " });
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const navig = useNavigate();

  const errorCallBack1 = () => {
    setDisable(false);
  };

  const GenerateTemp = () => {
    setDisable(true);
    dispatch(GenerateTemplate(Text, BackToTemplates, errorCallBack1));
  };

  const BackToTemplates = () => {
    navig("/dashboard/templates");
  };

  useEffect(() => {
    console.log(Text);
  }, [Text]);

  const setHeader = (text) => {
    setText({ ...Text, header: text });
  };
  const setBody = (text) => {
    setText({ ...Text, body: text });
  };
  const setFooter = (text) => {
    setText({ ...Text, footer: text });
  };

  // ********* popups ********
  const [dialog, setdialog] = useState({
    active: false,
    type: "", // share / preview / gentempdoc
    value: null,
  });
  const openDial = (type, value) => {
    setdialog({ active: true, type: type, value: value });
  };

  const closeDial = () => {
    setdialog({ active: false, type: "", value: null });
  };

  const openShare = () => {
    openDial("share", null);
  };

  const gentempdoc = () => {
    openDial("gentempdoc", Text);
  };

  const openPreview = () => {
    openDial("preview", Text);
  };

  return (
    <div className={css.main}>
      <h4>Créer un nouveau fichierMes fichiers</h4>
      <div className="create-temp">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="model">
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
            <p className="previsualise" onClick={openPreview}>
              Prévisualiser
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
            <div className="text-editers">
              <div className="text-editer">
                <TextEditor
                  data={Text.header}
                  onChange={setHeader}
                  height="200px"
                />
              </div>
              <div className="text-editer">
                <TextEditor
                  data={Text.body}
                  onChange={setBody}
                  height="200px"
                />
              </div>
              <div className="text-editer">
                <TextEditor
                  data={Text.footer}
                  onChange={setFooter}
                  height="200px"
                />
              </div>
              <div className="buttons">
                {/* <TabButtonGf>Sauvegarder</TabButtonGf>
                <TabButtonGf onClick={openShare}>Partager</TabButtonGf> */}
                <TabButtonGf loading={disable} onClick={GenerateTemp}>
                  Sauvegarder
                </TabButtonGf>
                <TabButtonGf onClick={gentempdoc}>
                  Sauvegarder et generer fichier
                </TabButtonGf>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {dialog.type === "share" ? (
        <Partager dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
      {dialog.type === "preview" ? (
        <Preview dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
      {dialog.type === "gentempdoc" ? (
        <GenTempAndDoc dialog={dialog} handleClose={closeDial} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default CreateTemps;
