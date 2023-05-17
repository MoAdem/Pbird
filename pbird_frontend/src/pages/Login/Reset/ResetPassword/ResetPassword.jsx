import React, { useEffect, useState } from "react";
import { useStyles } from "./ResetPasswordStyles";
import { Grid } from "@mui/material";

import logo from "../../../../assets/svgs/logo/logo1.svg";
import Input2 from "../../../../components/Inputs/Input2";
import SubmitBtn from "../../../../components/Buttons/SubmitBtn";
import { useNavigate } from "react-router-dom";

// redux and actions
import { useDispatch } from "react-redux";
import { SetPasses } from "../../../../store/actions/Auth.action";

function ResetPassword() {
  const css = useStyles();

  const [form, setform] = useState({
    password: { value: "", error: false },
    password2: { value: "", error: false },
  });
  const dispatch = useDispatch();
  const navig = useNavigate();

  const inputHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: { error: false, value: e.target.value },
    });
  };

  const signinPage = () => {
    navig("/signin");
  };

  const submit = (e) => {
    e.preventDefault();
    let { password, password2 } = form;

    // password verification
    if (password.value === "") {
      setform({
        ...form,
        password: { ...form.password, error: true },
      });
      return false;
    }

    // password verification
    if (password2.value !== password.value) {
      setform({
        ...form,
        password2: { ...form.password2, error: true },
      });
      return false;
    }

    // the password are correct => send to server
    let pass = {
      password: form.password.value,
      password2: form.password2.value,
    };
    dispatch(SetPasses(pass, signinPage));
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
                <p>maintenant définissez votre mot de passe</p>
              </div>

              <form>
                <Input2
                  label="Mot de passe"
                  errorMs="(Hé, votre mot de passe est invalide)"
                  type="text"
                  name="password"
                  error={form.password.error}
                  value={form.password.value}
                  onChange={inputHandler}
                />
                <Input2
                  label="Validation de Mot de passe"
                  errorMs="(Hé, validation est invalide)"
                  type="text"
                  name="password2"
                  error={form.password2.error}
                  value={form.password2.value}
                  onChange={inputHandler}
                />
                <SubmitBtn onClick={submit}> Valider </SubmitBtn>
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

export default ResetPassword;
