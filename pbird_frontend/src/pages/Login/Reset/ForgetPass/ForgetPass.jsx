import React, { useEffect, useState } from "react";
import { useStyles } from "./ForgetPassStyles";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/svgs/logo/logo1.svg";
import Input2 from "../../../../components/Inputs/Input2";
import CheckBx from "../../../../components/Inputs/CheckBox";
import SubmitBtn from "../../../../components/Buttons/SubmitBtn";
import NavLinkEdited from "../../../../components/NavLink/NavLink";

import { isMobile } from "../../../../functions/inputValidator";

// redux and actions
import { useDispatch } from "react-redux";
import { Reset_pass } from "../../../../store/actions/Auth.action";

function ForgetPass() {
  const css = useStyles();

  const [form, setform] = useState({
    phone_number: { value: "", error: false },
  });
  const dispatch = useDispatch();
  const navig = useNavigate();

  const validationPage = () => {
    navig("/validation_reset");
  };

  const inputHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: { error: false, value: e.target.value },
    });
  };

  const submit = (e) => {
    e.preventDefault();
    let { phone_number } = form;

    // mobile verification
    if (!isMobile(phone_number.value)) {
      setform({
        ...form,
        phone_number: { ...form.phone_number, error: true },
      });
      return false;
    }

    // the password and phone number are correct => send to server
    let auth = {
      phone_number: form.phone_number.value,
    };
    dispatch(Reset_pass(auth, validationPage));
  };

  return (
    <main className={css.main}>
      <Grid container spacing={0}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="images"></div>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="login">
            <div>
              <img src={logo} alt="PBird" className="logo" />

              <div className="title">
                <h1>Réinitialiser votre mot de passe</h1>
                <p>
                  Vous n'avez pas encore de compte ?{" "}
                  <span className="main-color">
                    <NavLinkEdited to={"/registration"}>
                      S'inscrire
                    </NavLinkEdited>
                  </span>
                </p>
              </div>

              <form>
                <Input2
                  label="Numéro de téléphone"
                  errorMs="(Hé, votre numéro est invalide)"
                  type="text"
                  name="phone_number"
                  error={form.phone_number.error}
                  value={form.phone_number.value}
                  onChange={inputHandler}
                />
                <SubmitBtn onClick={submit}> Connexion </SubmitBtn>
              </form>
            </div>

            <h6>
              En vous inscrivant, vous acceptez <span> les Conditions </span> et
              <span> la Politique de confidentialité.</span>
            </h6>
          </div>
        </Grid>
      </Grid>
    </main>
  );
}

export default ForgetPass;
