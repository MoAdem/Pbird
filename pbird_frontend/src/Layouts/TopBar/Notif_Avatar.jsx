import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Menu from "../../components/Menu/Menu";
import MenuItem from "@mui/material/MenuItem";

import notification from "../../assets/svgs/notification.svg";
import person_img from "../../assets/images/Circle.png";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/actions/Auth.action";

import { useStyles } from "./TopBarStyles";

function Notif_Avatar() {
  const css = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={css.PersoGroup}>
      <IconButton className="button-notif">
        <img src={notification} />
      </IconButton>

      <div>
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 46, height: 46 }}
          src={person_img}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          pos={18}
        >
          <div className={css.notif_menu}>
            <MenuItem>Status : En ligne</MenuItem>
            <Divider />
            <MenuItem>Paramètres du compte</MenuItem>
            <Divider />
            <MenuItem>Feedback</MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                dispatch(Logout());
              }}
            >
              Se déconnecter
            </MenuItem>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default Notif_Avatar;
