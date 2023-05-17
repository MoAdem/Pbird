import React, { useState } from "react";

import { useStyles } from "./SideBarStyles";
import logo from "../../assets/svgs/sidebar/logo.svg";
import full_logo from "../../assets/svgs/sidebar/full_logo.svg";

import NavLink from "../../components/NavLink/NavLink";

import { routes, routes2 } from "../../routes/Main.routes";

function SideBar() {
  const cs = useStyles();
  return (
    <div className={cs.siderbar}>
      <img src={full_logo} className={cs.full_logo} />
      <div className={cs.navlinks}>
        {routes.map((rt, key) => {
          return (
            <NavLink key={key} to={rt.mainUrl + rt.url}>
              <div className="icon_link">
                <img src={rt.img} />
                <span className="link_text"> {rt.title}</span>
              </div>
            </NavLink>
          );
        })}
        <hr />

        {routes2.map((rt, key) => {
          return (
            <NavLink key={key} to={rt.mainUrl + rt.url}>
              <div className="icon_link">
                <img src={rt.img} />
                <span className="link_text"> {rt.title}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
