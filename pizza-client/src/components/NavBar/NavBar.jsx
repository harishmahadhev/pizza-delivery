import { Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { Menu } from "@material-ui/icons";
import React from "react";
import "./navbar.css";
export default function NavBar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Menu className="topbarIconContainer" />
          <div className="logo">PIZZA </div>
        </div>

        <div className="topRight">
          <Avatar
            className="topbarIconContainer"
            alt="Harish"
            style={{
              backgroundColor: deepOrange[500],
              width: "30px",
              height: "30px",
            }}
          ></Avatar>
          <div className="topbarLabel">
            <div className="topbarUsername">MY ACCOUNT</div>
            <span className="topbarLogin">Login</span> |
            <span className="topbarLogin"> Signup</span>
          </div>
        </div>
      </div>
    </div>
  );
}
