import React, { useState, useEffect } from "react";
import { useStyles } from "./NumValidResetPassStyles";
import { Grid } from "@mui/material";

import logo from "../../../../assets/svgs/logo/logo1.svg";
import GreenOutlinedButton from "../../../../components/Buttons/GreenOutlinedButton";

import Spinner from "../../../../components/Spinner/SpinVer";

// redux and actions
import { useDispatch } from "react-redux";
import { ValidateRegister } from "../../../../store/actions/Auth.action";
import { useNavigate } from "react-router-dom";

function NumValidResetPass() {
  const css = useStyles();
  const [valNumb, setvalNumb] = useState("");
  const [match, setMatch] = useState(0); // 0:not verified yet / 1 : match / -1 : not equal
  const [verification, setVerification] = useState(false);
  const dispatch = useDispatch();
  const navig = useNavigate();

  const resetpasswordPage = () => {
    navig("/resetpassword");
  };

  const validate = (e) => {
    e.preventDefault();
    setVerification(true);
    /*********************** HERE ADD DISPATCH ***************************/
    dispatch(
      ValidateRegister(valNumb, setVerification, setMatch, resetpasswordPage)
    );
  };

  return (
    <main className={css.main}>
      <Grid container spacing={0}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="images"></div>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <div className="validation">
            <div>
              <img src={logo} alt="PBird" className="logo" />

              <div className="title">
                <h1>Réinitialiser votre mot de passe</h1>
              </div>
            </div>

            {verification ? (
              <Spinner text="Vérification" />
            ) : (
              <form>
                <p>
                  Entrer le code secret envoyé par SMS sur votre téléphone
                  portable
                </p>
                <InpNums
                  valNumb={valNumb}
                  setvalNumb={setvalNumb}
                  match={match}
                />
                <p className="resend-code">Demander un nouveau code</p>
                <GreenOutlinedButton onClick={validate}>
                  Suivant
                </GreenOutlinedButton>
              </form>
            )}

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

export default NumValidResetPass;

const InpNums = ({ valNumb, setvalNumb, match }) => {
  const [number, setNumber] = useState(["", "", "", "", "", ""]);

  const handlerChange = (event, key) => {
    //if (number[key].length == 0 || event.target.value === "") {
    let newNumber = [...number];
    newNumber[key] = event.target.value;
    setNumber([...newNumber]);
    if (key < 5 && event.target.value) {
      document.getElementById(`inp_${key + 1}`).focus();
    }
  };

  useEffect(() => {
    if (valNumb.length === 6) {
      setNumber(valNumb.split(""));
      document.getElementById(`inp_5`).focus();
    }
  }, []);

  useEffect(() => {
    setvalNumb(number.join(""));
  }, [number]);

  return (
    <div className="inputs">
      {number.map((num, key) => {
        return (
          <input
            className={`${match === 1 ? " match " : ""} ${
              match === -1 ? " not-match " : ""
            }`}
            key={key}
            value={num}
            maxLength="1"
            onChange={(event) => {
              handlerChange(event, key);
            }}
            type="text"
            name={`inp_${key}`}
            id={`inp_${key}`}
          />
        );
      })}
    </div>
  );
};
