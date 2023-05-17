import React from "react";
// import SideBar from "./SideBar/SideBar";
import SideBar from "../../Layouts/SideBar/SideBar";
import { makeStyles } from "@mui/styles";
import { Routes, Route } from "react-router-dom";

import { routes, NoNavRoutes } from "../../routes/Main.routes";

export const useStyles = makeStyles((theme) => ({
  content: {
    padding: "30px 54px 0px 260px",
    [theme.breakpoints.down("xl")]: {
      padding: "15px 30px 0px 215px",
    },
  },
}));

function Dashboard() {
  const css = useStyles();
  return (
    <div>
      <SideBar />
      <div className={css.content}>
        <Routes>
          {routes.map((elem, key) => {
            return <Route key={key} path={elem.url} element={elem.compo} />;
          })}
          {NoNavRoutes.map((elem, key) => {
            return <Route key={key} path={elem.url} element={elem.compo} />;
          })}
          {/* <Route path="/dashboard/*" element={<Navigate to="/main" />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
