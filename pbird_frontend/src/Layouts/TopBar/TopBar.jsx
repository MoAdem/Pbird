import React from "react";
//import RechInput from "../../../components/Inputs/RechInput";
import { useStyles } from "./TopBarStyles";
import Notif_Avatar from "./Notif_Avatar";
import Button from "../../components/Buttons/SubmitBtn";

function ToBaar() {
  const css = useStyles();

  return (
    <div className={css.TopBar}>
      <Notif_Avatar />
      <Button>Ajouter un projet</Button>
    </div>
  );
}

export default ToBaar;
