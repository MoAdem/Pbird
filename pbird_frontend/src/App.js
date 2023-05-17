import React, { useState, useEffect } from "react";

// ********************** COMPONENTS ************************
import Dashboard from "./pages/dashboard/Dashboard";
import SignIn from "./pages/Login/SignIn/SignIn";
import Register from "./pages/Login/Register/Register";
import NumValidation from "./pages/Login/NumValidation/NumValidation";
import SetPassword from "./pages/Login/SetPassword/SetPassword";
// reset password in login
import ForgetPass from "./pages/Login/Reset/ForgetPass/ForgetPass";
import NumValidResetPass from "./pages/Login/Reset/NumValidResetPass/NumValidResetPass";
import ResetPassword from "./pages/Login/Reset/ResetPassword/ResetPassword";

// ********************** COMPONENTS ************************

// ********************** User Dispatch *********************
import { useDispatch, useSelector } from "react-redux";
import { GetUserByToken } from "./store/actions/Auth.action";
import Spinner from "./components/Spinner/Spinner";

// to show every error or success message
import SnackBar from "./components/SnackBars/SnackBar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Theme from "./theme/Theme";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.user);
  const [spinn, setspinn] = useState(true);

  // to get user if possible
  useEffect(() => {
    dispatch(GetUserByToken(setspinn));
  }, []);

  return (
    <div className="App">
      <SnackBar />
      <Theme>
        {spinn ? (
          <Spinner />
        ) : (
          <Router>
            {user ? (
              <Routes>
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/*" element={<Navigate to="/dashboard/main" />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/signin" element={<SignIn />} />

                <Route path="/registration" element={<Register />} />
                <Route path="/validation" element={<NumValidation />} />
                <Route path="/setpassword" element={<SetPassword />} />

                <Route path="/reset_pass" element={<ForgetPass />} />
                <Route
                  path="/validation_reset"
                  element={<NumValidResetPass />}
                />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/*" element={<Navigate to="/signin" />} />
              </Routes>
            )}
          </Router>
        )}
      </Theme>
    </div>
  );
}

export default App;
