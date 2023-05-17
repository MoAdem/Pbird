import React from "react";
import Grid from "@mui/material/Grid";
import img from "../../../../assets/images/Circle2.png";
import signature from "../../../../assets/images/Signature.png";
import ordenances from "../../../../assets/images/ordenances.png";

import o1 from "../../../../assets/images/ordenances/o1.png";
import o2 from "../../../../assets/images/ordenances/o2.png";
import o3 from "../../../../assets/images/ordenances/o3.png";
import o4 from "../../../../assets/images/ordenances/o4.png";
import o5 from "../../../../assets/images/ordenances/o5.png";

import { useStyles } from "./EditProfilePageStyles";
import Input from "../../../../components/Inputs/Input";
import GreenButton from "../../../../components/Buttons/GreenButton";
function EditProfilePage() {
  const css = useStyles();
  return (
    <div className={css.editProfile}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <div className="img-importing-section">
            <img src={img} className="profile-img" />
            <p>
              Importer une nouvelle <br /> image
            </p>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className="inputs-section">
            <div className="details-du-compte">
              <p>Détails du compte</p>

              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Nom" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Prenom" />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Adresse" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Type Compte" />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Spécialité" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Diplômé de la" />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Numéro SIRET" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  {/* <Input label="Diplômé de la" /> */}
                </Grid>
              </Grid>
              <br />
            </div>
            <hr />
            <div className="securite">
              <p>Securite</p>
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Email" type="email" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  {/* <Input label="Diplômé de la" /> */}
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Numéro de téléphone" type="phone" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  {/* <Input label="Diplômé de la" /> */}
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Input label="Password" type="password" />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  {/* <Input label="Diplômé de la" /> */}
                </Grid>
              </Grid>
              <br />
              <p className="signature">Signature et cachet</p>
              <div className="signCont">
                <div className="signContImg">
                  <img src={signature}></img>
                </div>
                <p>Importer une nouvelle image</p>
              </div>
            </div>
            <hr />
            <div className="parrameter-ordonnances">
              <p>Paramètres d'ordonnance</p>
              <div className="ords-imgs">
                <img src={o1} />
                <img src={o2} />
                <img src={o3} />
                <img src={o4} />
                <img src={o5} />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <GreenButton center={true}> Sauvegarder</GreenButton>
    </div>
  );
}

export default EditProfilePage;
