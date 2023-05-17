import React, { useEffect, useState } from "react";
import { useStyles } from "./SignInStyles";
import { Grid } from "@mui/material";

import logo from "../../../assets/svgs/logo/logo1.svg";
import Input2 from "../../../components/Inputs/Input2";
import CheckBx from "../../../components/Inputs/CheckBox";
import SubmitBtn from "../../../components/Buttons/SubmitBtn";
import NavLinkEdited from "../../../components/NavLink/NavLink";

import { isPass, isMobile } from "../../../functions/inputValidator";

// redux and actions
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/Auth.action";

function SignIn() {
  const css = useStyles();

  const [form, setform] = useState({
    phone_number: { value: "", error: false },
    password: { value: "", error: false },
  });
  // const [remember, setRemeber] = useState(false);
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: { error: false, value: e.target.value },
    });
  };

  // const checkboxHandler = (e) => {
  //   setRemeber(e.target.checked);
  // };

  const submit = (e) => {
    e.preventDefault();
    let { phone_number, password } = form;

    // mobile verification
    if (!isMobile(phone_number.value)) {
      setform({
        ...form,
        phone_number: { ...form.phone_number, error: true },
      });
      return false;
    }

    // password verification
    if (password.value === "") {
      setform({
        ...form,
        password: { ...form.password, error: true },
      });
      return false;
    }

    // the password and phone number are correct => send to server
    let auth = {
      phone_number: form.phone_number.value,
      password: form.password.value,
    };
    dispatch(login(auth, true));
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
                <h1>Bienvenue sur PBird</h1>
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
                <Input2
                  label="Mot de passe"
                  errorMs="(Hé, votre mot de passe est invalide)"
                  type="password"
                  name="password"
                  error={form.password.error}
                  value={form.password.value}
                  onChange={inputHandler}
                />
                <div className="check-forget">
                  {/* <CheckBx
                    value={remember}
                    onChange={checkboxHandler}
                    label="Se souvenir de moi"
                  /> */}
                  <NavLinkEdited to={"/reset_pass"}>
                    Mot de passe oublié ?
                  </NavLinkEdited>
                </div>
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

export default SignIn;
