import React, { useState, useEffect } from "react";
import { useStyles } from "./RegisterStyles";
import { Grid } from "@mui/material";

import logo from "../../../assets/svgs/logo/logo1.svg";
import Input2 from "../../../components/Inputs/Input2";
import Select from "../../../components/Inputs/Select";
//import CheckBx from "../../../components/Inputs/CheckBox";
import SubmitBtn from "../../../components/Buttons/SubmitBtn";
import NavLinkEdited from "../../../components/NavLink/NavLink";

import { useNavigate } from "react-router-dom";

// redux and actions
import { useDispatch } from "react-redux";
import { register } from "../../../store/actions/Auth.action";

import {
  isPass,
  isMobile,
  isNom,
  isEmail,
} from "../../../functions/inputValidator";

function Register() {
  const css = useStyles();

  const [form, setform] = useState({
    first_name: { value: "", error: false },
    last_name: { value: "", error: false },
    email: { value: "", error: false },
    phone_number: { value: "", error: false },
    role: { value: "SIMPLE_USER", error: false },
    _company: { value: "", error: false },
    siret: { value: "", error: false },
  });

  const dispatch = useDispatch();
  const navig = useNavigate();

  const inputHandler = (e) => {
    setform({
      ...form,
      [e.target.name]: { error: false, value: e.target.value },
    });
  };

  const listRole = [
    { value: "SIMPLE_USER", text: "Utilisateur" },
    { value: "COMPANY", text: "Entreprise" },
  ];

  const submit = (e) => {
    e.preventDefault();
    let { first_name, last_name, email, phone_number, password } = form;

    // name verification
    if (!isNom(first_name.value)) {
      setform({
        ...form,
        first_name: { ...form.name, error: true },
      });
      return false;
    }

    // last_name verification
    if (!isNom(last_name.value)) {
      setform({
        ...form,
        last_name: { ...form.last_name, error: true },
      });
      return false;
    }

    // email verification
    if (!isEmail(email.value)) {
      setform({
        ...form,
        email: { ...form.email, error: true },
      });
      return false;
    }

    // mobile verification
    if (!isMobile(phone_number.value)) {
      setform({
        ...form,
        phone_number: { ...form.phone_number, error: true },
      });
      return false;
    }

    // verif company values
    if (form.role.value === "COMPANY") {
      if (form._company.value === "") {
        setform({
          ...form,
          _company: { ...form._company, error: true },
        });
        return false;
      }
      if (form.siret.value === "") {
        setform({
          ...form,
          siret: { ...form.siret, error: true },
        });
        return false;
      }
    }

    sendData();
  };

  const sendData = () => {
    // the password and phone number are correct => send to server
    let auth = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone_number: form.phone_number.value,
      role: form.role.value,
      _company: form._company.value,
      siret: form.siret.value,
    };
    dispatch(register(auth, validationPage));
  };

  const validationPage = () => {
    navig("/validation");
  };

  return (
    <main className={css.main}>
      <Grid container spacing={0}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="images"></div>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="register">
            <div>
              <img src={logo} alt="PBird" className="logo" />

              <div className="title">
                <h1>Rejoignez notre communauté!</h1>
                <p>
                  Vous avez déjà un compte?{" "}
                  <span className="main-color">
                    <NavLinkEdited to={"/signin"}>Connexion</NavLinkEdited>
                  </span>
                </p>
              </div>

              <form>
                <div className="row">
                  <Input2
                    label="Nom"
                    errorMs="(Nom est invalide)"
                    type="text"
                    name="first_name"
                    error={form.first_name.error}
                    value={form.first_name.value}
                    onChange={inputHandler}
                  />
                  <Input2
                    label="Prénom"
                    errorMs="(Prénom est invalide)"
                    type="text"
                    name="last_name"
                    error={form.last_name.error}
                    value={form.last_name.value}
                    onChange={inputHandler}
                  />
                </div>
                <Input2
                  label="Adresse email"
                  errorMs="(Hé, votre Email est invalide)"
                  type="email"
                  name="email"
                  error={form.email.error}
                  value={form.email.value}
                  onChange={inputHandler}
                />

                <Input2
                  label="Numéro de téléphone"
                  errorMs="(Hé, votre numéro est invalide)"
                  type="text"
                  name="phone_number"
                  error={form.phone_number.error}
                  value={form.phone_number.value}
                  onChange={inputHandler}
                />
                <Select
                  label="Type de compte"
                  name="role"
                  list={listRole}
                  value={form.role.value}
                  onChange={inputHandler}
                />
                {form.role.value === "COMPANY" ? (
                  <>
                    <Input2
                      label="Libellé de l'entreprise"
                      errorMs="(Hé, libellé est invalide)"
                      type="text"
                      name="_company"
                      error={form._company.error}
                      value={form._company.value}
                      onChange={inputHandler}
                    />
                    <Input2
                      label="Code série"
                      errorMs="(Hé, code série est invalide)"
                      type="text"
                      name="siret"
                      error={form.siret.error}
                      value={form.siret.value}
                      onChange={inputHandler}
                    />
                  </>
                ) : (
                  <></>
                )}
                <SubmitBtn onClick={submit}>
                  Rejoignez notre communauté!
                </SubmitBtn>
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

export default Register;
